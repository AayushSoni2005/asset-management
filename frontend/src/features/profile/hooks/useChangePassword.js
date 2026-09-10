import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { profileService } from "../services/profileService";

export const useChangePassword = () => {
    return useMutation({
        mutationFn: profileService.changePassword,

        onSuccess: (response) => {
            toast.success(response.message);
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.message ||
                "Failed to change password."
            );
        },
    });
};