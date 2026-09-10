import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Button,
    Stack,
    TextField,
    Typography,
    Link,
} from "@mui/material";

import loginSchema from "../validation/loginSchema";
import PasswordField from "./PasswordField";
import useLogin from "../hooks/useLogin";

export default function LoginForm() {
    const loginMutation = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data) => {
        loginMutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
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

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loginMutation.isPending}
                >
                    {loginMutation.isPending ? "Signing In..." : "Sign In"}
                </Button>

                <Link
                    component={RouterLink}
                    to="/forgot-password"
                    underline="hover"
                >
                    Forgot password?
                </Link>

                <Typography textAlign="center">
                    Don't have an account?{" "}
                    <Link
                        component={RouterLink}
                        to="/register"
                    >
                        Register
                    </Link>
                </Typography>
            </Stack>
        </form>
    );
}