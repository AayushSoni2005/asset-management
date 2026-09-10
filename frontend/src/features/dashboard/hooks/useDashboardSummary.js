import { useQuery } from "@tanstack/react-query";
import dashboardService from "../services/dashboardService";
import { dashboardKeys } from "../queryKeys";


export default function useDashboardSummary() {
    return useQuery({
        queryKey: dashboardKeys.summary(),
        queryFn: dashboardService.getSummary,
    });
}