import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { deleteUser } from "../services/userManagementService";
import { USER_QUERY_KEYS } from "../queryKeys";

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteUser,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: USER_QUERY_KEYS.all,
            });

            toast.success("User deleted successfully.");
        },

        onError: (error) => {
            toast.error(
                error?.response?.data?.message ||
                "Failed to delete user."
            );
        },
    });
};