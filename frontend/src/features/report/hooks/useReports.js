import { useQuery } from "@tanstack/react-query";
import { reportService } from "../services/reportService";

export function useEquipmentReport() {
    return useQuery({
        queryKey: ["equipment-report"],
        queryFn: reportService.getEquipmentReport,
    });
}

export function useIssueReport() {
    return useQuery({
        queryKey: ["issue-report"],
        queryFn: reportService.getIssueReport,
    });
}

export function useWorkOrderReport() {
    return useQuery({
        queryKey: ["workorder-report"],
        queryFn: reportService.getWorkOrderReport,
    });
}

export function useEmployeeReport() {
    return useQuery({
        queryKey: ["employee-report"],
        queryFn: reportService.getEmployeeReport,
    });
}