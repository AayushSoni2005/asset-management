import { useCallback, useMemo, useState } from "react";

import CrudPageLayout from "../../../components/common/CrudPageLayout";
import FormDialog from "../../../components/common/FormDialog";
import ConfirmDialog from "../../../components/common/ConfirmDialog";

import {
    EquipmentForm,
    getEquipmentColumns,
} from "../components";

import {
    useEquipments,
    useCreateEquipment,
    useUpdateEquipment,
    useDeleteEquipment,
} from "../hooks";

import { DEFAULT_VALUES } from "../validation/equipmentSchema";

export default function EquipmentPage() {
    // ===========================
    // Table State
    // ===========================

    const [search, setSearch] = useState("");

    // ===========================
    // Dialog State
    // ===========================

    const [dialog, setDialog] = useState({
        type: null,
        equipment: null,
    });

    // ===========================
    // Queries
    // ===========================

    const {
        data: response,
        isLoading,
        error,
        refetch,
    } = useEquipments();

    const equipments = response?.data ?? [];

    const filteredEquipments = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        if (!keyword) {
            return equipments;
        }

        return equipments.filter((equipment) => {
            return [
                equipment.assetTag,
                equipment.name,
                equipment.category,
                equipment.brand,
                equipment.model,
                equipment.serialNumber,
                equipment.status,
                equipment.location,
            ]
                .filter(Boolean)
                .some((value) =>
                    value
                        .toString()
                        .toLowerCase()
                        .includes(keyword)
                );
        });
    }, [equipments, search]);

    // ===========================
    // Mutations
    // ===========================

    const createEquipment = useCreateEquipment();
    const updateEquipment = useUpdateEquipment();
    const deleteEquipment = useDeleteEquipment();

    // ===========================
    // Dialog Handlers
    // ===========================

    const closeDialog = useCallback(() => {
        setDialog({
            type: null,
            equipment: null,
        });
    }, []);

    const handleAdd = useCallback(() => {
        setDialog({
            type: "create",
            equipment: null,
        });
    }, []);

    const handleEdit = useCallback((equipment) => {
        setDialog({
            type: "edit",
            equipment,
        });
    }, []);

    const handleDelete = useCallback((equipment) => {
        setDialog({
            type: "delete",
            equipment,
        });
    }, []);

    // ===========================
    // Submit Handlers
    // ===========================

    const handleSubmit = useCallback(
        (formData) => {
            if (dialog.type === "edit") {
                updateEquipment.mutate(
                    {
                        id: dialog.equipment.id,
                        data: formData,
                    },
                    {
                        onSuccess: closeDialog,
                    }
                );

                return;
            }

            createEquipment.mutate(formData, {
                onSuccess: closeDialog,
            });
        },
        [
            dialog,
            createEquipment,
            updateEquipment,
            closeDialog,
        ]
    );

    const handleConfirmDelete = useCallback(() => {
        if (!dialog.equipment) return;

        deleteEquipment.mutate(dialog.equipment.id, {
            onSuccess: closeDialog,
        });
    }, [
        dialog,
        deleteEquipment,
        closeDialog,
    ]);

    // ===========================
    // Columns
    // ===========================

    const columns = useMemo(
        () =>
            getEquipmentColumns({
                onEdit: handleEdit,
                onDelete: handleDelete,
            }),
        [handleEdit, handleDelete]
    );

    // ===========================
    // Render
    // ===========================

    return (
        <>
            <CrudPageLayout
                title="Equipment"
                subtitle="Manage company equipment."
                toolbarProps={{
                    search,
                    onSearchChange: setSearch,
                    searchPlaceholder:
                        "Search by asset tag, name, model or serial number...",
                    loading: isLoading,
                    onRefresh: refetch,
                    onAdd: handleAdd,
                    addButtonText: "Add Equipment",
                }}
                tableProps={{
                    rows: filteredEquipments,
                    columns,
                    loading: isLoading,
                    error,
                    getRowId: (row) => row.id,
                    rowCount:
                        filteredEquipments.length,
                }}
            />

            <FormDialog
                open={
                    dialog.type === "create" ||
                    dialog.type === "edit"
                }
                title={
                    dialog.type === "edit"
                        ? "Edit Equipment"
                        : "Add Equipment"
                }
                loading={
                    createEquipment.isPending ||
                    updateEquipment.isPending
                }
                maxWidth="md"
                fullWidth
                onClose={closeDialog}
            >
                <EquipmentForm
                    defaultValues={
                        dialog.equipment ??
                        DEFAULT_VALUES
                    }
                    loading={
                        createEquipment.isPending ||
                        updateEquipment.isPending
                    }
                    onSubmit={handleSubmit}
                    onCancel={closeDialog}
                />
            </FormDialog>

            <ConfirmDialog
                open={dialog.type === "delete"}
                title="Delete Equipment"
                description={`Are you sure you want to delete "${dialog.equipment?.name ?? ""}"?`}
                confirmText="Delete"
                confirmColor="error"
                loading={deleteEquipment.isPending}
                onConfirm={handleConfirmDelete}
                onClose={closeDialog}
            />
        </>
    );
}