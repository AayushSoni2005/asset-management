import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import employeeService from "../services/employeeService";
import { employeeKeys } from "../queryKeys";

export default function useCreateEmployee() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: employeeService.createEmployee,

        onSuccess: (response) => {
            toast.success(response.message);

            queryClient.invalidateQueries({
                queryKey: employeeKeys.lists(),
            });

            queryClient.invalidateQueries({
                queryKey: employeeKeys.availableUsers(),
            });
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.message ??
                "Unable to create employee."
            );
        },
    });
}