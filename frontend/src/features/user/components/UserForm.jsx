import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import {
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Switch,
    TextField,
} from "@mui/material";

import {
    createUserSchema,
    updateUserSchema,
    defaultCreateUserValues,
    defaultUpdateUserValues,
} from "../validation/userSchema";

const ROLE_OPTIONS = [
    "ADMIN",
    "EMPLOYEE",
    "TECHNICIAN",
];

export default function UserForm({
    defaultValues,
    onSubmit,
    onCancel,
    loading,
}) {
    const isEdit = Boolean(defaultValues);

    const {
        register,
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(
            isEdit
                ? updateUserSchema
                : createUserSchema
        ),
        defaultValues: isEdit
            ? {
                  ...defaultUpdateUserValues,
                  ...defaultValues,
                  password: "",
              }
            : defaultCreateUserValues,
    });

    useEffect(() => {
        if (isEdit) {
            reset({
                ...defaultUpdateUserValues,
                ...defaultValues,
                password: "",
            });
        } else {
            reset(defaultCreateUserValues);
        }
    }, [isEdit, defaultValues, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid
                container
                spacing={2}
            >
                <Grid size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        label="Email"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        type="password"
                        label={
                            isEdit
                                ? "New Password"
                                : "Password"
                        }
                        {...register("password")}
                        error={!!errors.password}
                        helperText={
                            errors.password?.message ??
                            (isEdit
                                ? "Leave blank to keep the current password."
                                : "")
                        }
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Controller
                        name="role"
                        control={control}
                        render={({ field }) => (
                            <FormControl
                                fullWidth
                                error={!!errors.role}
                            >
                                <InputLabel>
                                    Role
                                </InputLabel>

                                <Select
                                    {...field}
                                    label="Role"
                                >
                                    {ROLE_OPTIONS.map((role) => (
                                        <MenuItem
                                            key={role}
                                            value={role}
                                        >
                                            {role}
                                        </MenuItem>
                                    ))}
                                </Select>

                                <FormHelperText>
                                    {errors.role?.message}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Controller
                        name="enabled"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                label="Enabled"
                                control={
                                    <Switch
                                        checked={field.value}
                                        onChange={(e) =>
                                            field.onChange(
                                                e.target.checked
                                            )
                                        }
                                    />
                                }
                            />
                        )}
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="flex-end"
                    >
                        <Button
                            onClick={onCancel}
                            disabled={loading}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                        >
                            {isEdit
                                ? "Update User"
                                : "Create User"}
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </form>
    );
}