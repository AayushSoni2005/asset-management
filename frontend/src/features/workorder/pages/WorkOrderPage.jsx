import { useCallback, useMemo, useState } from "react";

import {
    CrudPageLayout,
    FormDialog,
    ConfirmDialog,
} from "../../../components/common";

import {
    WorkOrderForm,
    getWorkOrderColumns,
} from "../components";

import {
    useWorkOrders,
    useCreateWorkOrder,
    useUpdateWorkOrder,
    useDeleteWorkOrder,
    useAssignWorkOrder,
    useStartWorkOrder,
    useCompleteWorkOrder,
    useCancelWorkOrder,
} from "../hooks";

import useAuthStore from "@/features/auth/store/authStore";

import {
    canManageWorkOrders,
    canOperateWorkOrders,
} from "@/utils/permissions";

export default function WorkOrderPage() {
    // ===========================
    // Auth
    // ===========================

    const user = useAuthStore((state) => state.user);

    const canManage = canManageWorkOrders(user);
    const canOperate = canOperateWorkOrders(user);

    // ===========================
    // Table State
    // ===========================

    const [search, setSearch] = useState("");

    // ===========================
    // Dialog State
    // ===========================

    const [dialog, setDialog] = useState({
        type: null,
        workOrder: null,
    });

    // ===========================
    // Queries
    // ===========================

    const {
        data,
        isLoading,
        error,
        refetch,
    } = useWorkOrders();

    const workOrders = data?.data ?? [];

    const filteredWorkOrders = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        if (!keyword) {
            return workOrders;
        }

        return workOrders.filter((workOrder) => {
            return [
                workOrder.workOrderNumber,
                workOrder.title,
                workOrder.description,
                workOrder.status,
                workOrder.priority,
                workOrder.category,
                workOrder.equipmentName,
                workOrder.assetTag,
                workOrder.assignedTo,
                workOrder.createdBy,
            ]
                .filter(Boolean)
                .some((value) =>
                    value
                        .toString()
                        .toLowerCase()
                        .includes(keyword)
                );
        });
    }, [workOrders, search]);

    // ===========================
    // Mutations
    // ===========================

    const createWorkOrder = useCreateWorkOrder();
    const updateWorkOrder = useUpdateWorkOrder();
    const deleteWorkOrder = useDeleteWorkOrder();

    const assignWorkOrder = useAssignWorkOrder();
    const startWorkOrder = useStartWorkOrder();
    const completeWorkOrder = useCompleteWorkOrder();
    const cancelWorkOrder = useCancelWorkOrder();

    // ===========================
    // Dialog Handlers
    // ===========================

    const closeDialog = useCallback(() => {
        setDialog({
            type: null,
            workOrder: null,
        });
    }, []);

    const handleAdd = useCallback(() => {
        if (!canManage) return;

        setDialog({
            type: "create",
            workOrder: null,
        });
    }, [canManage]);

    const handleEdit = useCallback(
        (workOrder) => {
            if (!canManage) return;

            setDialog({
                type: "edit",
                workOrder,
            });
        },
        [canManage]
    );

    const handleDelete = useCallback(
        (workOrder) => {
            if (!canManage) return;

            setDialog({
                type: "delete",
                workOrder,
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
                updateWorkOrder.mutate(
                    {
                        id: dialog.workOrder.id,
                        data: formData,
                    },
                    {
                        onSuccess: closeDialog,
                    }
                );

                return;
            }

            createWorkOrder.mutate(formData, {
                onSuccess: closeDialog,
            });
        },
        [
            dialog,
            createWorkOrder,
            updateWorkOrder,
            closeDialog,
        ]
    );

    const handleConfirmDelete = useCallback(() => {
        if (!dialog.workOrder) return;

        deleteWorkOrder.mutate(dialog.workOrder.id, {
            onSuccess: closeDialog,
        });
    }, [
        dialog,
        deleteWorkOrder,
        closeDialog,
    ]);

    const handleAssign = useCallback(
        (workOrder) => {
            if (!canManage) return;

            assignWorkOrder.mutate(workOrder.id);
        },
        [
            assignWorkOrder,
            canManage,
        ]
    );

    const handleStart = useCallback(
        (workOrder) => {
            if (!canOperate) return;

            startWorkOrder.mutate(workOrder.id);
        },
        [
            startWorkOrder,
            canOperate,
        ]
    );

    const handleComplete = useCallback(
        (workOrder) => {
            if (!canOperate) return;

            completeWorkOrder.mutate(workOrder.id);
        },
        [
            completeWorkOrder,
            canOperate,
        ]
    );

    const handleCancel = useCallback(
        (workOrder) => {
            if (!canOperate) return;

            cancelWorkOrder.mutate(workOrder.id);
        },
        [
            cancelWorkOrder,
            canOperate,
        ]
    );

    // ===========================
    // Columns
    // ===========================

    const columns = useMemo(
        () =>
            getWorkOrderColumns({
                onEdit: canManage
                    ? handleEdit
                    : undefined,

                onDelete: canManage
                    ? handleDelete
                    : undefined,

                onAssign: canManage
                    ? handleAssign
                    : undefined,

                onStart: canOperate
                    ? handleStart
                    : undefined,

                onComplete: canOperate
                    ? handleComplete
                    : undefined,

                onCancel: canOperate
                    ? handleCancel
                    : undefined,
            }),
        [
            canManage,
            canOperate,
            handleEdit,
            handleDelete,
            handleAssign,
            handleStart,
            handleComplete,
            handleCancel,
        ]
    );

    // ===========================
    // Render
    // ===========================

    return (
        <>
            <CrudPageLayout
                title="Work Orders"
                subtitle="Manage maintenance work orders."
                toolbarProps={{
                    search,
                    onSearchChange: setSearch,
                    searchPlaceholder:
                        "Search by work order number, title, equipment or status...",
                    loading: isLoading,
                    onRefresh: refetch,
                    onAdd: canManage
                        ? handleAdd
                        : undefined,
                    addButtonText: canManage
                        ? "Create Work Order"
                        : undefined,
                }}
                tableProps={{
                    rows: filteredWorkOrders,
                    columns,
                    loading: isLoading,
                    error,
                    getRowId: (row) => row.id,
                    rowCount:
                        filteredWorkOrders.length,
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
                            ? "Edit Work Order"
                            : "Create Work Order"
                    }
                    loading={
                        createWorkOrder.isPending ||
                        updateWorkOrder.isPending
                    }
                    maxWidth="md"
                    onClose={closeDialog}
                >
                    <WorkOrderForm
                        initialData={
                            dialog.workOrder
                        }
                        loading={
                            createWorkOrder.isPending ||
                            updateWorkOrder.isPending
                        }
                        onSubmit={handleSubmit}
                        onCancel={closeDialog}
                    />
                </FormDialog>
            )}

            {canManage && (
                <ConfirmDialog
                    open={
                        dialog.type === "delete"
                    }
                    title="Delete Work Order"
                    description="Are you sure you want to delete this work order?"
                    confirmText="Delete"
                    confirmColor="error"
                    loading={
                        deleteWorkOrder.isPending
                    }
                    onConfirm={
                        handleConfirmDelete
                    }
                    onClose={closeDialog}
                />
            )}
        </>
    );
}