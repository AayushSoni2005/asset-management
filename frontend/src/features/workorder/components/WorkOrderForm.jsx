import { useEffect, useMemo } from "react";
import PropTypes from "prop-types";

import {
    Autocomplete,
    Box,
    Button,
    Grid,
    Stack,
    TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    DEFAULT_VALUES,
    workOrderSchema,
} from "../validation/workOrderSchema";

import { useIssues } from "../../issue/hooks";
import { useTechnicians } from "../../employee/hooks";

export default function WorkOrderForm({
    initialData,
    loading,
    onSubmit,
    onCancel,
}) {
    // ===========================
    // Queries
    // ===========================

    const {
        data: issueResponse,
        isLoading: issuesLoading,
    } = useIssues();

    const {
        data: technicianResponse,
        isLoading: techniciansLoading,
    } = useTechnicians();

    const issues = issueResponse?.data ?? [];
    const technicians = technicianResponse?.data ?? [];

    // ===========================
    // Default Values
    // ===========================

    const defaultValues = useMemo(() => {
        if (initialData) {
            return {
                issueId: initialData.issue?.id ?? null,
                technicianId: initialData.technician?.id ?? null,
                title: initialData.title ?? "",
                repairNotes: initialData.repairNotes ?? "",
            };
        }

        return DEFAULT_VALUES;
    }, [initialData]);

    // ===========================
    // Form
    // ===========================

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isDirty,
        },
    } = useForm({
        resolver: zodResolver(workOrderSchema),
        defaultValues,
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    // ===========================
    // Render
    // ===========================

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Grid
                container
                spacing={2}
            >
                <Grid size={{ xs: 12 }}>
                    <Controller
                        name="issueId"
                        control={control}
                        render={({ field }) => (
                            <Autocomplete
                                options={issues}
                                loading={issuesLoading}
                                disableClearable
                                value={
                                    issues.find(
                                        (issue) =>
                                            issue.id === field.value
                                    ) ?? null
                                }
                                isOptionEqualToValue={(option, value) =>
                                    option.id === value.id
                                }
                                onChange={(_, value) =>
                                    field.onChange(value?.id ?? null)
                                }
                                getOptionLabel={(option) =>
                                    `${option.issueNumber} - ${option.title}`
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Issue"
                                        error={!!errors.issueId}
                                        helperText={
                                            errors.issueId?.message
                                        }
                                    />
                                )}
                            />
                        )}
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Controller
                        name="technicianId"
                        control={control}
                        render={({ field }) => (
                            <Autocomplete
                                options={technicians}
                                loading={techniciansLoading}
                                disableClearable
                                value={
                                    technicians.find(
                                        (technician) =>
                                            technician.id === field.value
                                    ) ?? null
                                }
                                isOptionEqualToValue={(option, value) =>
                                    option.id === value.id
                                }
                                onChange={(_, value) =>
                                    field.onChange(value?.id ?? null)
                                }
                                getOptionLabel={(option) =>
                                    `${option.employeeId} - ${option.fullName} (${option.email})`
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Technician"
                                        error={!!errors.technicianId}
                                        helperText={
                                            errors.technicianId?.message
                                        }
                                    />
                                )}
                            />
                        )}
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        label="Title"
                        {...register("title")}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        multiline
                        minRows={4}
                        label="Repair Notes"
                        {...register("repairNotes")}
                        error={!!errors.repairNotes}
                        helperText={errors.repairNotes?.message}
                    />
                </Grid>
            </Grid>

            <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                mt={3}
            >
                <Button
                    variant="outlined"
                    onClick={onCancel}
                >
                    Cancel
                </Button>

                <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={loading}
                    disabled={!isDirty}
                >
                    Save
                </LoadingButton>
            </Stack>
        </Box>
    );
}

WorkOrderForm.propTypes = {
    initialData: PropTypes.object,
    loading: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

WorkOrderForm.defaultProps = {
    initialData: null,
    loading: false,
};