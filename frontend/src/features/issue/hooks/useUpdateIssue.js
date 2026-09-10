import { useMutation, useQueryClient } from "@tanstack/react-query";

import issueService from "../services/issueService";
import { issueKeys } from "../queryKeys";

const useUpdateIssue = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) =>
            issueService.updateIssue(id, data),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: issueKeys.lists(),
            });

            queryClient.invalidateQueries({
                queryKey: issueKeys.detail(variables.id),
            });
        },
    });
};

export default useUpdateIssue;