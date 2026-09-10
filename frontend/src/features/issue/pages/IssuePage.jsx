import { useCallback, useMemo, useState } from "react";

import CrudPageLayout from "@/components/common/CrudPageLayout";
import FormDialog from "@/components/common/FormDialog";
import ConfirmDialog from "@/components/common/ConfirmDialog";

import {
    IssueForm,
    getIssueColumns,
} from "../components";

import {
    useIssues,
    useCreateIssue,
    useUpdateIssue,
    useDeleteIssue,
} from "../hooks";

import  useAuthStore  from "@/features/auth/store/authStore";

import {
    canCreateIssue,
    canUpdateIssue,
    canDeleteIssue,
} from "@/utils/permissions";

export default function IssuePage() {
    // ===========================
    // Auth
    // ===========================

    const user = useAuthStore((state) => state.user);

    const canCreate = canCreateIssue(user);
    const canEdit = canUpdateIssue(user);
    const canDelete = canDeleteIssue(user);

    // ===========================
    // Dialog State
    // ===========================

    const [dialog, setDialog] = useState({
        type: null,
        issue: null,
    });

    // ===========================
    // Queries
    // ===========================

    const {
        data: response,
        isLoading,
        error,
        refetch,
    } = useIssues();

    const issues = response?.data ?? [];

    // ===========================
    // Mutations
    // ===========================

    const createIssue = useCreateIssue();

    const updateIssue = useUpdateIssue();

    const deleteIssue = useDeleteIssue();

    // ===========================
    // Dialog Handlers
    // ===========================

    const closeDialog = useCallback(() => {
        setDialog({
            type: null,
            issue: null,
        });
    }, []);

    const handleAdd = useCallback(() => {
        if (!canCreate) return;

        setDialog({
            type: "create",
            issue: null,
        });
    }, [canCreate]);

    const handleEdit = useCallback(
        (issue) => {
            if (!canEdit) return;

            setDialog({
                type: "edit",
                issue,
            });
        },
        [canEdit]
    );

    const handleDelete = useCallback(
        (issue) => {
            if (!canDelete) return;

            setDialog({
                type: "delete",
                issue,
            });
        },
        [canDelete]
    );

    // ===========================
    // Submit Handlers
    // ===========================

    const handleSubmit = useCallback(
        (formData) => {
            if (dialog.type === "edit") {
                updateIssue.mutate(
                    {
                        id: dialog.issue.id,
                        data: formData,
                    },
                    {
                        onSuccess: closeDialog,
                    }
                );

                return;
            }

            createIssue.mutate(formData, {
                onSuccess: closeDialog,
            });
        },
        [
            dialog,
            createIssue,
            updateIssue,
            closeDialog,
        ]
    );

    const handleConfirmDelete = useCallback(() => {
        if (!dialog.issue) return;

        deleteIssue.mutate(dialog.issue.id, {
            onSuccess: closeDialog,
        });
    }, [
        dialog,
        deleteIssue,
        closeDialog,
    ]);

    // ===========================
    // Columns
    // ===========================

    const columns = useMemo(
        () =>
            getIssueColumns({
                onEdit: canEdit
                    ? handleEdit
                    : undefined,
                onDelete: canDelete
                    ? handleDelete
                    : undefined,
            }),
        [
            canEdit,
            canDelete,
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
                title="Issues"
                subtitle="Manage reported equipment issues."
                toolbarProps={{
                    loading: isLoading,

                    onRefresh: refetch,

                    onAdd: canCreate
                        ? handleAdd
                        : undefined,

                    addButtonText: canCreate
                        ? "Report Issue"
                        : undefined,
                }}
                tableProps={{
                    rows: issues,
                    columns,
                    loading: isLoading,
                    error,
                    getRowId: (row) => row.id,
                }}
            />

            {(canCreate || canEdit) && (
                <FormDialog
                    open={
                        dialog.type ===
                            "create" ||
                        dialog.type ===
                            "edit"
                    }
                    title={
                        dialog.type ===
                        "edit"
                            ? "Edit Issue"
                            : "Report Issue"
                    }
                    loading={
                        createIssue.isPending ||
                        updateIssue.isPending
                    }
                    onClose={closeDialog}
                >
                    <IssueForm
                        defaultValues={
                            dialog.issue
                        }
                        loading={
                            createIssue.isPending ||
                            updateIssue.isPending
                        }
                        onCancel={
                            closeDialog
                        }
                        onSubmit={
                            handleSubmit
                        }
                    />
                </FormDialog>
            )}

            {canDelete && (
                <ConfirmDialog
                    open={
                        dialog.type ===
                        "delete"
                    }
                    title="Delete Issue"
                    description={`Are you sure you want to delete "${dialog.issue?.issueNumber ?? ""}"?`}
                    confirmText="Delete"
                    confirmColor="error"
                    loading={
                        deleteIssue.isPending
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