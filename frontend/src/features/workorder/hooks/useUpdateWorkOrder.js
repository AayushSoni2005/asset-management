import { useMutation, useQueryClient } from "@tanstack/react-query";

import workOrderService from "../services/workOrderService";
import { workOrderKeys } from "../queryKeys";

export default function useUpdateWorkOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) =>
            workOrderService.updateWorkOrder(id, data),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: workOrderKeys.lists(),
            });

            queryClient.invalidateQueries({
                queryKey: workOrderKeys.detail(variables.id),
            });
        },
    });
}