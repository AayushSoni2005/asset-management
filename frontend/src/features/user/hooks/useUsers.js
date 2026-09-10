import { useQuery } from "@tanstack/react-query";

import { getUsers } from "../services/userManagementService";
import { USER_QUERY_KEYS } from "../queryKeys";

export const useUsers = () => {
    return useQuery({
        queryKey: USER_QUERY_KEYS.lists(),
        queryFn: getUsers,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
    });
};