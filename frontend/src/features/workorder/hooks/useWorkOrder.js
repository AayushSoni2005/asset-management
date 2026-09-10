import { useQuery } from "@tanstack/react-query";

import workOrderService from "../services/workOrderService";
import { workOrderKeys } from "../queryKeys";

export default function useWorkOrder(id) {
    return useQuery({
        queryKey: workOrderKeys.detail(id),
        queryFn: () => workOrderService.getWorkOrderById(id),
        enabled: !!id,
    });
}