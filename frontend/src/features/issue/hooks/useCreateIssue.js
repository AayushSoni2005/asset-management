import { useMutation, useQueryClient } from "@tanstack/react-query";

import issueService from "../services/issueService";
import { issueKeys } from "../queryKeys";

const useCreateIssue = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: issueService.createIssue,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: issueKeys.lists(),
            });
        },
    });
};

export default useCreateIssue;