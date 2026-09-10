import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { updateUser } from "../services/userManagementService";
import { USER_QUERY_KEYS } from "../queryKeys";

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) =>
    updateUser(id, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: USER_QUERY_KEYS.all,
            });

            toast.success("User updated successfully.");
        },

        onError: (error) => {
            toast.error(
                error?.response?.data?.message ||
                "Failed to update user."
            );
        },
    });
};