import {
    Button,
    Stack,
    TextField,
    Typography,
    Link,
} from "@mui/material";

import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PasswordField from "./PasswordField";
import registerSchema from "../validation/registerSchema";
import useRegister from "../hooks/useRegister";

export default function RegisterForm() {
    const registerMutation = useRegister();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data) => {
        registerMutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                <TextField
                    label="First Name"
                    {...register("firstName")}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                />

                <TextField
                    label="Last Name"
                    {...register("lastName")}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                />

                <TextField
                    label="Email"
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />

                <PasswordField
                    label="Password"
                    {...register("password")}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />

                <PasswordField
                    label="Confirm Password"
                    {...register("confirmPassword")}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                />

                <Button
                    type="submit"
                    variant="contained"
                    disabled={registerMutation.isPending}
                >
                    {registerMutation.isPending
                        ? "Creating Account..."
                        : "Create Account"}
                </Button>

                <Typography align="center">
                    Already have an account?{" "}
                    <Link
                        component={RouterLink}
                        to="/login"
                    >
                        Login
                    </Link>
                </Typography>
            </Stack>
        </form>
    );
}