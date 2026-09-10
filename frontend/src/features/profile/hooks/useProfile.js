import { useQuery } from "@tanstack/react-query";

import { profileKeys } from "../queryKeys";
import { profileService } from "../services/profileService";

export const useProfile = () => {
    return useQuery({
        queryKey: profileKeys.me(),
        queryFn: profileService.getProfile,
        staleTime: 5 * 60 * 1000,
    });
};