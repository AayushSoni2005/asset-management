import { useQuery } from "@tanstack/react-query";

import { analyticsKeys } from "../queryKeys";
import { analyticsService } from "../services/analyticsService";

export function useEquipmentStatusAnalytics() {
    return useQuery({
        queryKey: analyticsKeys.equipmentStatus(),
        queryFn: analyticsService.getEquipmentStatus,
        staleTime: 5 * 60 * 1000,
    });
}