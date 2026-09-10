import { useQuery } from "@tanstack/react-query";

import { analyticsKeys } from "../queryKeys";
import { analyticsService } from "../services/analyticsService";

export function useWorkOrderStatusAnalytics() {
    return useQuery({
        queryKey: analyticsKeys.workOrderStatus(),
        queryFn: analyticsService.getWorkOrderStatus,
        staleTime: 5 * 60 * 1000,
    });
}