import { useMutation, useQueryClient } from "@tanstack/react-query";

import workOrderService from "../services/workOrderService";
import { workOrderKeys } from "../queryKeys";
import { issueKeys } from "../../issue/queryKeys";

export default function useStartWorkOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: workOrderService.startWorkOrder,

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