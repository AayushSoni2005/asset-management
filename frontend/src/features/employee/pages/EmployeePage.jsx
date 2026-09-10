import { useCallback, useMemo, useState } from "react";

import CrudPageLayout from "../../../components/common/CrudPageLayout";
import FormDialog from "../../../components/common/FormDialog";
import ConfirmDialog from "../../../components/common/ConfirmDialog";

import useAuthStore from "@/features/auth/store/authStore";
import { canManageEmployees } from "@/utils/permissions";

import { PAGE_SIZE_OPTIONS } from "../../../constants/pagination";

import {
    EmployeeForm,
    getEmployeeColumns,
} from "../components";

import {
    useEmployees,
    useAvailableUsers,
    useCreateEmployee,
    useUpdateEmployee,
    useDeleteEmployee,
} from "../hooks";

export default function EmployeePage() {
    const user = useAuthStore((state) => state.user);

    const canManage = canManageEmployees(user);

    // ===========================
    // Table State
    // ===========================

    const [search, setSearch] = useState("");

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: PAGE_SIZE_OPTIONS[0],
    });

    // ===========================
    // Dialog State
    // ===========================

    const [dialog, setDialog] = useState({
        type: null,
        employee: null,
    });

    // ===========================
    // Queries
    // ===========================

    const {
        data,
        isLoading,
        error,
        refetch,
    } = useEmployees();

    const {
        data: availableUsersResponse,
        isLoading: availableUsersLoading,
    } = useAvailableUsers({
        enabled: canManage,
    });

    const employees = data?.data ?? [];

    const filteredEmployees = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        if (!keyword) {
            return employees;
        }

        return employees.filter((employee) => {
            return [
                employee.employeeId,
                employee.fullName,
                employee.email,
                employee.department,
                employee.designation,
                employee.role,
            ]
                .filter(Boolean)
                .some((value) =>
                    value
                        .toString()
                        .toLowerCase()
                        .includes(keyword)
                );
        });
    }, [employees, search]);

    const availableUsers =
        availableUsersResponse?.data ?? [];

    // ===========================
    // Mutations
    // ===========================

    const createEmployee = useCreateEmployee();

    const updateEmployee = useUpdateEmployee();

    const deleteEmployee = useDeleteEmployee();

    // ===========================
    // Dialog Handlers
    // ===========================

    const closeDialog = useCallback(() => {
        setDialog({
            type: null,
            employee: null,
        });
    }, []);

    const handleAdd = useCallback(() => {
        if (!canManage) return;

        setDialog({
            type: "create",
            employee: null,
        });
    }, [canManage]);

    const handleEdit = useCallback((employee) => {
        if (!canManage) return;

        setDialog({
            type: "edit",
            employee,
        });
    }, [canManage]);

    const handleDelete = useCallback((employee) => {
        if (!canManage) return;

        setDialog({
            type: "delete",
            employee,
        });
    }, [canManage]);

    // ===========================
    // Submit Handlers
    // ===========================

    const handleSubmit = useCallback(
        (formData) => {
            if (dialog.type === "edit") {
                updateEmployee.mutate(
                    {
                        id: dialog.employee.id,
                        data: formData,
                    },
                    {
                        onSuccess: closeDialog,
                    }
                );

                return;
            }

            createEmployee.mutate(formData, {
                onSuccess: closeDialog,
            });
        },
        [
            dialog,
            createEmployee,
            updateEmployee,
            closeDialog,
        ]
    );

    const handleConfirmDelete = useCallback(() => {
        if (!dialog.employee) return;

        deleteEmployee.mutate(dialog.employee.id, {
            onSuccess: closeDialog,
        });
    }, [
        dialog,
        deleteEmployee,
        closeDialog,
    ]);

    // ===========================
    // Columns
    // ===========================

    const columns = useMemo(
        () =>
            getEmployeeColumns({
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
                title="Employees"
                subtitle="Manage organization employees"
                toolbarProps={{
                    search,
                    onSearchChange: setSearch,
                    searchPlaceholder:
                        "Search by employee ID, name or email...",
                    onRefresh: refetch,
                    loading: isLoading,
                    onAdd: canManage
                        ? handleAdd
                        : undefined,
                    addButtonText: canManage
                        ? "Add Employee"
                        : undefined,
                }}
                tableProps={{
                    rows: filteredEmployees,
                    columns,
                    loading: isLoading,
                    error,
                    paginationMode: "client",
                    sortingMode: "client",
                    paginationModel,
                    onPaginationModelChange:
                        setPaginationModel,
                    rowCount:
                        filteredEmployees.length,
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
                            ? "Edit Employee"
                            : "Add Employee"
                    }
                    loading={
                        createEmployee.isPending ||
                        updateEmployee.isPending ||
                        availableUsersLoading
                    }
                    onClose={closeDialog}
                >
                    <EmployeeForm
                        defaultValues={
                            dialog.employee
                        }
                        availableUsers={
                            availableUsers
                        }
                        loading={
                            createEmployee.isPending ||
                            updateEmployee.isPending ||
                            availableUsersLoading
                        }
                        onCancel={closeDialog}
                        onSubmit={handleSubmit}
                    />
                </FormDialog>
            )}

            {canManage && (
                <ConfirmDialog
                    open={
                        dialog.type === "delete"
                    }
                    title="Delete Employee"
                    description="Are you sure you want to delete this employee? This action cannot be undone."
                    confirmText="Delete"
                    confirmColor="error"
                    loading={
                        deleteEmployee.isPending
                    }
                    onClose={closeDialog}
                    onConfirm={
                        handleConfirmDelete
                    }
                />
            )}
        </>
    );
}