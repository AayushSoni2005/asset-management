import { useQuery } from "@tanstack/react-query";

import employeeService from "../services/employeeService";
import { employeeKeys } from "../queryKeys";

export default function useEmployee(id, options = {}) {
    return useQuery({
        queryKey: employeeKeys.detail(id),

        queryFn: () => employeeService.getEmployee(id),

        enabled: Boolean(id),

        ...options,
    });
}