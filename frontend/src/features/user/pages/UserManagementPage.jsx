import { useCallback, useMemo, useState } from "react";

import CrudPageLayout from "@/components/common/CrudPageLayout";
import FormDialog from "@/components/common/FormDialog";
import ConfirmDialog from "@/components/common/ConfirmDialog";

import {
    UserForm,
    getUserColumns,
} from "../components";

import {
    useUsers,
    useCreateUser,
    useUpdateUser,
    useDeleteUser,
} from "../hooks";

import useAuthStore from "@/features/auth/store/authStore";

import {
    canManageUsers,
} from "@/utils/permissions";

export default function UserManagementPage() {
    // ===========================
    // Auth
    // ===========================

    const user = useAuthStore((state) => state.user);

    const canManage = canManageUsers(user);

    // ===========================
    // Table State
    // ===========================

    const [search, setSearch] = useState("");

    // ===========================
    // Dialog State
    // ===========================

    const [dialog, setDialog] = useState({
        type: null,
        user: null,
    });

    // ===========================
    // Queries
    // ===========================

    const {
        data: response,
        isLoading,
        error,
        refetch,
    } = useUsers();

    const users = response?.data ?? [];

    const filteredUsers = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        if (!keyword) {
            return users;
        }

        return users.filter((user) => {
            return [
                user.username,
                user.firstName,
                user.lastName,
                user.email,
                user.role,
                user.status,
                user.employeeId,
            ]
                .filter(Boolean)
                .some((value) =>
                    value
                        .toString()
                        .toLowerCase()
                        .includes(keyword)
                );
        });
    }, [users, search]);

    // ===========================
    // Mutations
    // ===========================

    const createUser = useCreateUser();

    const updateUser = useUpdateUser();

    const deleteUser = useDeleteUser();

    // ===========================
    // Dialog Handlers
    // ===========================

    const closeDialog = useCallback(() => {
        setDialog({
            type: null,
            user: null,
        });
    }, []);

    const handleAdd = useCallback(() => {
        if (!canManage) return;

        setDialog({
            type: "create",
            user: null,
        });
    }, [canManage]);

    const handleEdit = useCallback(
        (user) => {
            if (!canManage) return;

            setDialog({
                type: "edit",
                user,
            });
        },
        [canManage]
    );

    const handleDelete = useCallback(
        (user) => {
            if (!canManage) return;

            setDialog({
                type: "delete",
                user,
            });
        },
        [canManage]
    );

    // ===========================
    // Submit Handlers
    // ===========================

    const handleSubmit = useCallback(
        (formData) => {
            if (dialog.type === "edit") {
                updateUser.mutate(
                    {
                        id: dialog.user.id,
                        data: formData,
                    },
                    {
                        onSuccess: closeDialog,
                    }
                );

                return;
            }

            createUser.mutate(formData, {
                onSuccess: closeDialog,
            });
        },
        [
            dialog,
            createUser,
            updateUser,
            closeDialog,
        ]
    );

    const handleConfirmDelete = useCallback(() => {
        if (!dialog.user) return;

        deleteUser.mutate(dialog.user.id, {
            onSuccess: closeDialog,
        });
    }, [
        dialog,
        deleteUser,
        closeDialog,
    ]);

    // ===========================
    // Columns
    // ===========================

    const columns = useMemo(
        () =>
            getUserColumns({
                onEdit: canManage
                    ? handleEdit
                    : undefined,
                onDelete: canManage
                    ? handleDelete
                    : undefined,
            }),
        [
            canManage,
            handleEdit,
            handleDelete,
        ]
    );

    // ===========================
    // Render
    // ===========================

    return (
        <>
            <CrudPageLayout
                title="Users"
                subtitle="Manage system users and roles."
                toolbarProps={{
                    search,
                    onSearchChange: setSearch,
                    searchPlaceholder:
                        "Search by username, name, email or role...",
                    loading: isLoading,
                    onRefresh: refetch,
                    onAdd: canManage
                        ? handleAdd
                        : undefined,
                    addButtonText: canManage
                        ? "Add User"
                        : undefined,
                }}
                tableProps={{
                    rows: filteredUsers,
                    columns,
                    loading: isLoading,
                    error,
                    getRowId: (row) => row.id,
                    rowCount:
                        filteredUsers.length,
                }}
            />

            {canManage && (
                <FormDialog
                    open={
                        dialog.type === "create" ||
                        dialog.type === "edit"
                    }
                    title={
                        dialog.type === "edit"
                            ? "Edit User"
                            : "Create User"
                    }
                    loading={
                        createUser.isPending ||
                        updateUser.isPending
                    }
                    onClose={closeDialog}
                >
                    <UserForm
                        defaultValues={dialog.user}
                        loading={
                            createUser.isPending ||
                            updateUser.isPending
                        }
                        onCancel={closeDialog}
                        onSubmit={handleSubmit}
                    />
                </FormDialog>
            )}

            {canManage && (
                <ConfirmDialog
                    open={dialog.type === "delete"}
                    title="Delete User"
                    description={`Are you sure you want to delete "${dialog.user?.firstName ?? ""} ${dialog.user?.lastName ?? ""}"?`}
                    confirmText="Delete"
                    confirmColor="error"
                    loading={deleteUser.isPending}
                    onClose={closeDialog}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </>
    );
}