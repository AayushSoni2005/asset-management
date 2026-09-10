import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import authService from "../services/authService";

export default function useResendVerificationEmail() {
    return useMutation({
        mutationFn: authService.resendVerificationEmail,

        onSuccess: (response) => {
            toast.success(
                response.message ??
                "Verification email sent successfully."
            );
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.message ??
                "Unable to send verification email."
            );
        },
    });
}