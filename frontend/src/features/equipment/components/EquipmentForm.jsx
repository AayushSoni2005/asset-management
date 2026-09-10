import { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import LoadingButton from "@mui/lab/LoadingButton";
import {
    Autocomplete,
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";

import {
    equipmentSchema,
    DEFAULT_VALUES,
    EQUIPMENT_STATUS,
} from "../validation/equipmentSchema";

import { useEmployees } from "../../employee/hooks";

function EquipmentForm({
    defaultValues = DEFAULT_VALUES,
    loading = false,
    onSubmit,
    onCancel,
}) {
    const {
        register,
        control,
        handleSubmit,
        watch,
        reset,
        formState: {
            errors,
            isDirty,
        },
    } = useForm({
        resolver: zodResolver(equipmentSchema),
        defaultValues,
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    const status = watch("status");

    const {
        data: employeesResponse,
        isLoading: employeesLoading,
    } = useEmployees();

    const employees = useMemo(() => {
        if (!employeesResponse) {
            return [];
        }

        return employeesResponse.data ?? employeesResponse;
    }, [employeesResponse]);

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label="Asset Tag"
                        {...register("assetTag")}
                        error={!!errors.assetTag}
                        helperText={errors.assetTag?.message}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label="Equipment Name"
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label="Category"
                        {...register("category")}
                        error={!!errors.category}
                        helperText={errors.category?.message}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label="Brand"
                        {...register("brand")}
                        error={!!errors.brand}
                        helperText={errors.brand?.message}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label="Model"
                        {...register("model")}
                        error={!!errors.model}
                        helperText={errors.model?.message}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label="Serial Number"
                        {...register("serialNumber")}
                        error={!!errors.serialNumber}
                        helperText={errors.serialNumber?.message}
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        label="Location"
                        {...register("location")}
                        error={!!errors.location}
                        helperText={errors.location?.message}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <FormControl
                                fullWidth
                                error={!!errors.status}
                            >
                                <InputLabel>Status</InputLabel>

                                <Select
                                    {...field}
                                    label="Status"
                                >
                                    {EQUIPMENT_STATUS.map((status) => (
                                        <MenuItem
                                            key={status}
                                            value={status}
                                        >
                                            {status.replaceAll("_", " ")}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    />
                </Grid>

                {status === "ASSIGNED" && (
                    <Grid size={{ xs: 12 }}>
                        <Controller
                            name="assignedToEmployeeId"
                            control={control}
                            render={({ field }) => (
                                <Autocomplete
                                    loading={employeesLoading}
                                    options={employees}
                                    value={
                                        employees.find(
                                            (employee) =>
                                                employee.id === field.value
                                        ) ?? null
                                    }
                                    onChange={(_, employee) =>
                                        field.onChange(employee?.id ?? null)
                                    }
                                    getOptionLabel={(employee) =>
                                        `${employee.employeeId} - ${employee.firstName} ${employee.lastName}`
                                    }
                                    isOptionEqualToValue={(option, value) =>
                                        option.id === value.id
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Assigned Employee"
                                            error={
                                                !!errors.assignedToEmployeeId
                                            }
                                            helperText={
                                                errors.assignedToEmployeeId
                                                    ?.message
                                            }
                                        />
                                    )}
                                />
                            )}
                        />
                    </Grid>
                )}

                <Grid size={{ xs: 12 }}>
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        gap={2}
                        mt={2}
                    >
                        <Button
                            variant="outlined"
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
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

EquipmentForm.propTypes = {
    defaultValues: PropTypes.shape({
        assetTag: PropTypes.string,
        name: PropTypes.string,
        category: PropTypes.string,
        brand: PropTypes.string,
        model: PropTypes.string,
        serialNumber: PropTypes.string,
        location: PropTypes.string,
        status: PropTypes.string,
        assignedToEmployeeId: PropTypes.number,
    }),
    loading: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default EquipmentForm;