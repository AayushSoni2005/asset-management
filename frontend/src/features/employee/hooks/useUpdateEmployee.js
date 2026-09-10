import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import employeeService from "../services/employeeService";
import { employeeKeys } from "../queryKeys";

export default function useUpdateEmployee() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) =>
            employeeService.updateEmployee(id, data),

        onSuccess: (response, variables) => {
            toast.success(response.message);

            queryClient.invalidateQueries({
                queryKey: employeeKeys.lists(),
            });

            queryClient.invalidateQueries({
                queryKey: employeeKeys.detail(
                    variables.id
                ),
            });

            queryClient.invalidateQueries({
                queryKey: employeeKeys.availableUsers(),
            });
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.message ??
                "Unable to update employee."
            );
        },
    });
}