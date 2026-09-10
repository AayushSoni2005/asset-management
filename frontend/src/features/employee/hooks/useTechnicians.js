import { useQuery } from "@tanstack/react-query";

import employeeService from "../services/employeeService";
import { employeeKeys } from "../queryKeys";

export default function useTechnicians() {
    return useQuery({
        queryKey: employeeKeys.technicians(),
        queryFn: employeeService.getTechnicians,
    });
}