import { useMutation, useQueryClient } from "@tanstack/react-query";

import workOrderService from "../services/workOrderService";
import { workOrderKeys } from "../queryKeys";

export default function useCreateWorkOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: workOrderService.createWorkOrder,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: workOrderKeys.lists(),
            });
        },
    });
}