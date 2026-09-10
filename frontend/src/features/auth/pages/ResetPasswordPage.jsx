import { Button, Stack } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PasswordField from "../components/PasswordField";
import resetPasswordSchema from "../validation/resetPasswordSchema";
import useResetPassword from "../hooks/useResetPassword";

export default function ResetPasswordForm() {
    const resetPassword = useResetPassword();
    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit = (data) => {
        resetPassword.mutate({
            token,
            password: data.password,
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                <PasswordField
                    label="New Password"
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
                    disabled={resetPassword.isPending}
                >
                    {resetPassword.isPending
                        ? "Updating..."
                        : "Reset Password"}
                </Button>
            </Stack>
        </form>
    );
}