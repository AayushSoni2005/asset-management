import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { createUser } from "../services/userManagementService";
import { USER_QUERY_KEYS } from "../queryKeys";

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createUser,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: USER_QUERY_KEYS.all,
            });

            toast.success("User created successfully.");
        },

        onError: (error) => {
            toast.error(
                error?.response?.data?.message ||
                "Failed to create user."
            );
        },
    });
};