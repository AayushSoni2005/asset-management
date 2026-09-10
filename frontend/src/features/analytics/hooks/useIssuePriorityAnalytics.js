import { useQuery } from "@tanstack/react-query";

import { analyticsKeys } from "../queryKeys";
import { analyticsService } from "../services/analyticsService";

export function useIssuePriorityAnalytics() {
    return useQuery({
        queryKey: analyticsKeys.issuePriority(),
        queryFn: analyticsService.getIssuePriority,
        staleTime: 5 * 60 * 1000,
    });
}