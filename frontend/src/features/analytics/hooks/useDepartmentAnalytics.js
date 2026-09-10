import { useQuery } from "@tanstack/react-query";

import { analyticsKeys } from "../queryKeys";
import { analyticsService } from "../services/analyticsService";

export function useDepartmentAnalytics() {
    return useQuery({
        queryKey: analyticsKeys.departments(),
        queryFn: analyticsService.getDepartments,
        staleTime: 5 * 60 * 1000,
    });
}