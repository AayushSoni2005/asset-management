import { useState } from "react";
import PropTypes from "prop-types";

import {
    Box,
    Button,
    Grid,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";

import {
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { changePasswordSchema } from "../validation/changePasswordSchema";

const DEFAULT_VALUES = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
};

export default function ChangePasswordForm({
    loading = false,
    onSubmit,
}) {
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isDirty,
        },
    } = useForm({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: DEFAULT_VALUES,
    });

    const togglePassword = (field) => {
        setShowPasswords((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const getAdornment = (field) => (
        <InputAdornment position="end">
            <IconButton
                edge="end"
                onClick={() => togglePassword(field)}
                onMouseDown={(e) => e.preventDefault()}
                aria-label={`Toggle ${field} password visibility`}
            >
                {showPasswords[field] ? (
                    <VisibilityOff />
                ) : (
                    <Visibility />
                )}
            </IconButton>
        </InputAdornment>
    );

    const submitHandler = (data) => {
        onSubmit(data);
        reset(DEFAULT_VALUES);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(submitHandler)}
            noValidate
        >
            <Stack spacing={3}>
                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Your password should be at least 8 characters long and
                    include uppercase, lowercase, a number, and a special
                    character.
                </Typography>

                <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Current Password"
                            type={
                                showPasswords.current
                                    ? "text"
                                    : "password"
                            }
                            autoComplete="current-password"
                            {...register("currentPassword")}
                            error={!!errors.currentPassword}
                            helperText={
                                errors.currentPassword?.message
                            }
                            InputProps={{
                                endAdornment:
                                    getAdornment("current"),
                            }}
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="New Password"
                            type={
                                showPasswords.new
                                    ? "text"
                                    : "password"
                            }
                            autoComplete="new-password"
                            {...register("newPassword")}
                            error={!!errors.newPassword}
                            helperText={
                                errors.newPassword?.message
                            }
                            InputProps={{
                                endAdornment:
                                    getAdornment("new"),
                            }}
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Confirm New Password"
                            type={
                                showPasswords.confirm
                                    ? "text"
                                    : "password"
                            }
                            autoComplete="new-password"
                            {...register("confirmPassword")}
                            error={!!errors.confirmPassword}
                            helperText={
                                errors.confirmPassword?.message
                            }
                            InputProps={{
                                endAdornment:
                                    getAdornment("confirm"),
                            }}
                        />
                    </Grid>
                </Grid>

                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="flex-end"
                >
                    <Button
                        variant="outlined"
                        disabled={loading || !isDirty}
                        onClick={() => reset(DEFAULT_VALUES)}
                    >
                        Reset
                    </Button>

                    <LoadingButton
                        type="submit"
                        variant="contained"
                        loading={loading}
                        disabled={!isDirty}
                    >
                        Change Password
                    </LoadingButton>
                </Stack>
            </Stack>
        </Box>
    );
}

ChangePasswordForm.propTypes = {
    loading: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
};