import { useQuery } from "@tanstack/react-query";

import equipmentService from "../services/equipmentService";
import { equipmentKeys } from "../queryKeys";

export default function useEquipments() {
    return useQuery({
        queryKey: equipmentKeys.list(),
        queryFn: equipmentService.getEquipments,
    });
}