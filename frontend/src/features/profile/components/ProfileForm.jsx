import { useEffect } from "react";
import PropTypes from "prop-types";

import {
    Avatar,
    Box,
    Button,
    Chip,
    Divider,
    Grid,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { profileSchema } from "../validation/profileSchema";

const DEFAULT_VALUES = {
    hasEmployeeProfile: false,
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    department: "",
    designation: "",
    role: "",
    status: "",
};

export default function ProfileForm({
    defaultValues = DEFAULT_VALUES,
    loading = false,
    onSubmit,
}) {
    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isDirty,
        },
    } = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues,
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    const hasEmployeeProfile = defaultValues.hasEmployeeProfile;

    const initials = `${defaultValues.firstName?.[0] ?? ""}${
        defaultValues.lastName?.[0] ?? ""
    }`.toUpperCase();

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            <Stack spacing={4}>
                <Stack
                    direction={{
                        xs: "column",
                        sm: "row",
                    }}
                    spacing={2}
                    alignItems={{
                        xs: "center",
                        sm: "center",
                    }}
                >
                    <Avatar
                        sx={{
                            width: 72,
                            height: 72,
                            fontSize: 28,
                            fontWeight: 600,
                        }}
                    >
                        {initials || "U"}
                    </Avatar>

                    <Box flex={1}>
                        <Typography variant="h6">
                            {hasEmployeeProfile
                                ? `${defaultValues.firstName} ${defaultValues.lastName}`
                                : "User Account"}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                        >
                            {defaultValues.email}
                        </Typography>

                        <Stack
                            direction="row"
                            spacing={1}
                            flexWrap="wrap"
                        >
                            <Chip
                                size="small"
                                color="primary"
                                label={defaultValues.role}
                            />

                            {hasEmployeeProfile && (
                                <Chip
                                    size="small"
                                    color={
                                        defaultValues.status === "ACTIVE"
                                            ? "success"
                                            : "default"
                                    }
                                    label={defaultValues.status}
                                />
                            )}
                        </Stack>
                    </Box>
                </Stack>

                <Divider />

                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                >
                    Account Information
                </Typography>

                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Email"
                            value={defaultValues.email ?? ""}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>
                        <TextField
                            fullWidth
                            label="Role"
                            value={defaultValues.role ?? ""}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>
                        <TextField
                            fullWidth
                            label="Employee ID"
                            value={defaultValues.employeeId ?? ""}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                </Grid>

                <Divider />

                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                >
                    Employee Information
                </Typography>

                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="First Name"
                            {...register("firstName")}
                            disabled={!hasEmployeeProfile}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            {...register("lastName")}
                            disabled={!hasEmployeeProfile}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Phone Number"
                            {...register("phoneNumber")}
                            disabled={!hasEmployeeProfile}
                            error={!!errors.phoneNumber}
                            helperText={errors.phoneNumber?.message}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Department"
                            {...register("department")}
                            disabled={!hasEmployeeProfile}
                            error={!!errors.department}
                            helperText={errors.department?.message}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Designation"
                            {...register("designation")}
                            disabled={!hasEmployeeProfile}
                            error={!!errors.designation}
                            helperText={errors.designation?.message}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Status"
                            value={defaultValues.status ?? ""}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                </Grid>

                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    spacing={2}
                >
                    <Button
                        variant="outlined"
                        disabled={loading || !isDirty}
                        onClick={() => reset(defaultValues)}
                    >
                        Reset
                    </Button>

                    <LoadingButton
                        type="submit"
                        variant="contained"
                        loading={loading}
                        disabled={!hasEmployeeProfile || !isDirty}
                    >
                        Save Changes
                    </LoadingButton>
                </Stack>
            </Stack>
        </Box>
    );
}

ProfileForm.propTypes = {
    defaultValues: PropTypes.shape({
        hasEmployeeProfile: PropTypes.bool,
        employeeId: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        phoneNumber: PropTypes.string,
        department: PropTypes.string,
        designation: PropTypes.string,
        role: PropTypes.string,
        status: PropTypes.string,
    }),
    loading: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
};