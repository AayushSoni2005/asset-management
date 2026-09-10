import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import forgotPasswordSchema from "../validation/forgotPasswordSchema";
import useForgotPassword from "../hooks/useForgotPassword";

export default function ForgotPasswordForm() {
    const forgotPassword = useForgotPassword();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (data) => {
        forgotPassword.mutate(data.email);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                <TextField
                    label="Email Address"
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />

                <Button
                    type="submit"
                    variant="contained"
                    disabled={forgotPassword.isPending}
                >
                    {forgotPassword.isPending
                        ? "Sending..."
                        : "Send Reset Link"}
                </Button>
            </Stack>
        </form>
    );
}