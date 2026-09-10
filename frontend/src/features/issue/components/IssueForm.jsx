import PropTypes from "prop-types";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
    Autocomplete,
    Box,
    Button,
    Grid,
    MenuItem,
    Stack,
    TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { useEmployees } from "@/features/employee/hooks";
import { useEquipments } from "@/features/equipment/hooks";

import {
    DEFAULT_VALUES,
    issueSchema,
} from "../validation/issueSchema";

const PRIORITIES = [
    "LOW",
    "MEDIUM",
    "HIGH",
    "CRITICAL",
];

const IssueForm = ({
    defaultValues,
    loading,
    onCancel,
    onSubmit,
}) => {
    const {
        data: employeeResponse,
        isLoading: employeesLoading,
    } = useEmployees();

    const {
        data: equipmentResponse,
        isLoading: equipmentsLoading,
    } = useEquipments();

    const employees = employeeResponse?.data ?? [];
    const equipments = equipmentResponse?.data ?? [];

    const {
        control,
        handleSubmit,
        formState: { errors, isDirty },
        reset,
    } = useForm({
        resolver: zodResolver(issueSchema),
        defaultValues: DEFAULT_VALUES,
    });

    useEffect(() => {
        if (defaultValues) {
            reset({
                equipmentId:
                    defaultValues.equipment?.id ?? null,

                reportedByEmployeeId:
                    defaultValues.reportedBy?.id ?? null,

                assignedToEmployeeId:
                    defaultValues.assignedTo?.id ?? null,

                title: defaultValues.title ?? "",

                description:
                    defaultValues.description ?? "",

                priority:
                    defaultValues.priority ?? "",
            });
        } else {
            reset(DEFAULT_VALUES);
        }
    }, [defaultValues, reset]);

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Controller
                        name="equipmentId"
                        control={control}
                        render={({ field }) => (
                            <Autocomplete
                                options={equipments}
                                loading={equipmentsLoading}
                                value={
                                    equipments.find(
                                        (equipment) =>
                                            equipment.id ===
                                            field.value
                                    ) ?? null
                                }
                                onChange={(_, value) =>
                                    field.onChange(
                                        value?.id ?? null
                                    )
                                }
                                getOptionLabel={(option) =>
                                    `${option.assetTag} - ${option.name}`
                                }
                                isOptionEqualToValue={(
                                    option,
                                    value
                                ) =>
                                    option.id === value.id
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Equipment"
                                        required
                                        error={
                                            !!errors.equipmentId
                                        }
                                        helperText={
                                            errors.equipmentId
                                                ?.message
                                        }
                                    />
                                )}
                            />
                        )}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Controller
                        name="reportedByEmployeeId"
                        control={control}
                        render={({ field }) => (
                            <Autocomplete
                                options={employees}
                                loading={employeesLoading}
                                value={
                                    employees.find(
                                        (employee) =>
                                            employee.id ===
                                            field.value
                                    ) ?? null
                                }
                                onChange={(_, value) =>
                                    field.onChange(
                                        value?.id ?? null
                                    )
                                }
                                getOptionLabel={(option) =>
                                    `${option.EmployeeId} - ${option.firstName} ${option.lastName}`
                                }
                                isOptionEqualToValue={(
                                    option,
                                    value
                                ) =>
                                    option.id === value.id
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Reported By"
                                        required
                                        error={
                                            !!errors.reportedByEmployeeId
                                        }
                                        helperText={
                                            errors
                                                .reportedByEmployeeId
                                                ?.message
                                        }
                                    />
                                )}
                            />
                        )}
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Controller
                        name="assignedToEmployeeId"
                        control={control}
                        render={({ field }) => (
                            <Autocomplete
                                options={employees}
                                loading={employeesLoading}
                                value={
                                    employees.find(
                                        (employee) =>
                                            employee.id ===
                                            field.value
                                    ) ?? null
                                }
                                onChange={(_, value) =>
                                    field.onChange(
                                        value?.id ?? null
                                    )
                                }
                                getOptionLabel={(option) =>
                                    `${option.EmployeeId} - ${option.firstName} ${option.lastName}`
                                }
                                isOptionEqualToValue={(
                                    option,
                                    value
                                ) =>
                                    option.id === value.id
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Assigned To"
                                    />
                                )}
                            />
                        )}
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Issue Title"
                                fullWidth
                                required
                                error={!!errors.title}
                                helperText={
                                    errors.title?.message
                                }
                            />
                        )}
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Description"
                                fullWidth
                                multiline
                                minRows={4}
                                required
                                error={!!errors.description}
                                helperText={
                                    errors.description
                                        ?.message
                                }
                            />
                        )}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Controller
                        name="priority"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                select
                                label="Priority"
                                fullWidth
                                required
                                error={!!errors.priority}
                                helperText={
                                    errors.priority?.message
                                }
                            >
                                {PRIORITIES.map(
                                    (priority) => (
                                        <MenuItem
                                            key={priority}
                                            value={priority}
                                        >
                                            {priority}
                                        </MenuItem>
                                    )
                                )}
                            </TextField>
                        )}
                    />
                </Grid>
            </Grid>

            <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                sx={{ mt: 3 }}
            >
                <Button
                    onClick={onCancel}
                    disabled={loading}
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
};

IssueForm.propTypes = {
    defaultValues: PropTypes.object,
    loading: PropTypes.bool,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

IssueForm.defaultProps = {
    defaultValues: null,
    loading: false,
};

export default IssueForm;