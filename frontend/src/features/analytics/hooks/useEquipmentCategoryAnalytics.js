import { useQuery } from "@tanstack/react-query";

import { analyticsKeys } from "../queryKeys";
import { analyticsService } from "../services/analyticsService";

export function useEquipmentCategoryAnalytics() {
    return useQuery({
        queryKey: analyticsKeys.equipmentCategory(),
        queryFn: analyticsService.getEquipmentCategory,
        staleTime: 5 * 60 * 1000,
    });
}