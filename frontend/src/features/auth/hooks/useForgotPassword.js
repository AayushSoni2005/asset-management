import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import authService from "../services/authService";

export default function useForgotPassword() {
    return useMutation({
        mutationFn: authService.forgotPassword,

        onSuccess: (response) => {
            toast.success(
                response.message ||
                "Password reset link sent successfully."
            );
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.message ||
                "Unable to send password reset email."
            );
        },
    });
}