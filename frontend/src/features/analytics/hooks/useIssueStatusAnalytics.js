import { useQuery } from "@tanstack/react-query";

import { analyticsKeys } from "../queryKeys";
import { analyticsService } from "../services/analyticsService";

export function useIssueStatusAnalytics() {
    return useQuery({
        queryKey: analyticsKeys.issueStatus(),
        queryFn: analyticsService.getIssueStatus,
        staleTime: 5 * 60 * 1000,
    });
}