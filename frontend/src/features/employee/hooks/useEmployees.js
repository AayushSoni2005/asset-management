import { useQuery } from "@tanstack/react-query";

import employeeService from "../services/employeeService";
import { employeeKeys } from "../queryKeys";

export default function useEmployees(params) {
    return useQuery({
        queryKey: employeeKeys.list(params),

        queryFn: () =>
            employeeService.getEmployees(params),

        placeholderData: (previousData) =>
            previousData,
    });
}