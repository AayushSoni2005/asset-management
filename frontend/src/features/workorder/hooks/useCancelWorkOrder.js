import { useMutation, useQueryClient } from "@tanstack/react-query";

import workOrderService from "../services/workOrderService";
import { workOrderKeys } from "../queryKeys";
import { issueKeys } from "../../issue/queryKeys";

export default function useCancelWorkOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: workOrderService.cancelWorkOrder,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: workOrderKeys.lists(),
            });

            queryClient.invalidateQueries({
                queryKey: issueKeys.lists(),
            });
        },
    });
}