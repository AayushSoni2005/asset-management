import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import authService from "../services/authService";

export default function useResetPassword() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: authService.resetPassword,

        onSuccess: (response) => {
            toast.success(
                response.message ||
                "Password reset successfully."
            );

            navigate("/login", {
                replace: true,
            });
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.message ||
                "Unable to reset password."
            );
        },
    });
}