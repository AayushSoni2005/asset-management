import { useEffect } from "react";
import PropTypes from "prop-types";

import {
    Grid,
    MenuItem,
    Stack,
    TextField,
    Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import employeeSchema from "../validation/employeeSchema";
import { EMPLOYEE_STATUS } from "../constants";

const DEFAULT_VALUES = {
    userId: "",
    employeeId: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    department: "",
    designation: "",
    status: "ACTIVE",
};

export default function EmployeeForm({
    defaultValues,
    availableUsers,
    loading,
    onSubmit,
    onCancel,
}) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
    } = useForm({
        resolver: zodResolver(employeeSchema),
        defaultValues: DEFAULT_VALUES,
    });

    useEffect(() => {
        reset({
            ...DEFAULT_VALUES,
            ...defaultValues,
        });
    }, [defaultValues, reset]);

    const isEditMode = Boolean(defaultValues?.id);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        select
                        fullWidth
                        label="User"
                        defaultValue=""
                        disabled={isEditMode}
                        {...register("userId")}
                        error={!!errors.userId}
                        helperText={errors.userId?.message}
                    >
                        {availableUsers.map((user) => (
                            <MenuItem
                                key={user.id}
                                value={user.id}
                            >
                                {user.email} ({user.role})
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label="Employee ID"
                        {...register("employeeId")}
                        error={!!errors.employeeId}
                        helperText={errors.employeeId?.message}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label="First Name"
                        {...register("firstName")}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label="Last Name"
                        {...register("lastName")}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label="Phone Number"
                        {...register("phoneNumber")}
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber?.message}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label="Department"
                        {...register("department")}
                        error={!!errors.department}
                        helperText={errors.department?.message}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label="Designation"
                        {...register("designation")}
                        error={!!errors.designation}
                        helperText={errors.designation?.message}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        select
                        fullWidth
                        label="Status"
                        {...register("status")}
                        error={!!errors.status}
                        helperText={errors.status?.message}
                    >
                        {EMPLOYEE_STATUS.map((option) => (
                            <MenuItem
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>

            <Stack
                direction="row"
                justifyContent="flex-end"
                spacing={2}
                mt={4}
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
                    {isEditMode ? "Update Employee" : "Create Employee"}
                </LoadingButton>
            </Stack>
        </form>
    );
}

EmployeeForm.propTypes = {
    defaultValues: PropTypes.object,
    availableUsers: PropTypes.array,
    loading: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

EmployeeForm.defaultProps = {
    defaultValues: null,
    availableUsers: [],
    loading: false,
};