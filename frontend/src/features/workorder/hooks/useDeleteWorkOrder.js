import { useMutation, useQueryClient } from "@tanstack/react-query";

import workOrderService from "../services/workOrderService";
import { workOrderKeys } from "../queryKeys";

export default function useDeleteWorkOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: workOrderService.deleteWorkOrder,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: workOrderKeys.lists(),
            });
        },
    });
}