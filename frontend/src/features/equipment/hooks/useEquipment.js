import { useQuery } from "@tanstack/react-query";

import equipmentService from "../services/equipmentService";
import { equipmentKeys } from "../queryKeys";

export default function useEquipment(id, options = {}) {
    return useQuery({
        queryKey: equipmentKeys.detail(id),

        queryFn: () => equipmentService.getEquipment(id),

        enabled: !!id,

        ...options,
    });
}