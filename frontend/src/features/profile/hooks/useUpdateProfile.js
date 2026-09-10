import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { profileKeys } from "../queryKeys";
import { profileService } from "../services/profileService";

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: profileService.updateProfile,

        onSuccess: (response) => {
            queryClient.invalidateQueries({
                queryKey: profileKeys.me(),
            });

            toast.success(response.message);
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.message || "Failed to update profile."
            );
        },
    });
};