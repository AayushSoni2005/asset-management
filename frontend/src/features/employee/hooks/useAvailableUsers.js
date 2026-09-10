import { useQuery } from "@tanstack/react-query";

import employeeService from "../services/employeeService";
import { employeeKeys } from "../queryKeys";

export default function useAvailableUsers(options = {}) {
    return useQuery({
        queryKey: employeeKeys.availableUsers(),

        queryFn: () =>
            employeeService.getAvailableUsers(),

        staleTime: 5 * 60 * 1000,

        ...options,
    });
}