import { useMutation, useQueryClient } from "@tanstack/react-query";

import equipmentService from "../services/equipmentService";
import { equipmentKeys } from "../queryKeys";

export default function useUpdateEquipment(options = {}) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) =>
            equipmentService.updateEquipment(id, data),

        onSuccess: (_, variables, ...args) => {
            queryClient.invalidateQueries({
                queryKey: equipmentKeys.lists(),
            });

            queryClient.invalidateQueries({
                queryKey: equipmentKeys.detail(variables.id),
            });

            options.onSuccess?.(_, variables, ...args);
        },

        ...options,
    });
}