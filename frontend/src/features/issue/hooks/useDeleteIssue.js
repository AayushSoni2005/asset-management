import { useMutation, useQueryClient } from "@tanstack/react-query";

import issueService from "../services/issueService";
import { issueKeys } from "../queryKeys";

const useDeleteIssue = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: issueService.deleteIssue,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: issueKeys.lists(),
            });
        },
    });
};

export default useDeleteIssue;