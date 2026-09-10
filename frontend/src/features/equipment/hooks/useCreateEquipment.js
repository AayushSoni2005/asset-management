import { useMutation, useQueryClient } from "@tanstack/react-query";

import equipmentService from "../services/equipmentService";
import { equipmentKeys } from "../queryKeys";

export default function useCreateEquipment(options = {}) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: equipmentService.createEquipment,

        onSuccess: (...args) => {
            queryClient.invalidateQueries({
                queryKey: equipmentKeys.lists(),
            });

            options.onSuccess?.(...args);
        },

        ...options,
    });
}