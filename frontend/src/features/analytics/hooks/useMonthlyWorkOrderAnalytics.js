import { useQuery } from "@tanstack/react-query";

import { analyticsKeys } from "../queryKeys";
import { analyticsService } from "../services/analyticsService";

export function useMonthlyWorkOrderAnalytics() {
    return useQuery({
        queryKey: analyticsKeys.monthlyWorkOrders(),
        queryFn: analyticsService.getMonthlyWorkOrders,
        staleTime: 5 * 60 * 1000,
    });
}