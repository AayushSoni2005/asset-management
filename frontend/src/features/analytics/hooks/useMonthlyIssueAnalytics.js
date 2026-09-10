import { useQuery } from "@tanstack/react-query";

import { analyticsKeys } from "../queryKeys";
import { analyticsService } from "../services/analyticsService";

export function useMonthlyIssueAnalytics() {
    return useQuery({
        queryKey: analyticsKeys.monthlyIssues(),
        queryFn: analyticsService.getMonthlyIssues,
        staleTime: 5 * 60 * 1000,
    });
}