import { useQuery } from "@tanstack/react-query";

import workOrderService from "../services/workOrderService";
import { workOrderKeys } from "../queryKeys";

export default function useWorkOrders() {
    return useQuery({
        queryKey: workOrderKeys.list(),
        queryFn: workOrderService.getWorkOrders,
    });
}