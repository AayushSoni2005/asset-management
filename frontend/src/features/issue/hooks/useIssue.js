import { useQuery } from "@tanstack/react-query";

import issueService from "../services/issueService";
import { issueKeys } from "../queryKeys";

const useIssue = (id) => {
    return useQuery({
        queryKey: issueKeys.detail(id),
        queryFn: () => issueService.getIssueById(id),
        enabled: !!id,
    });
};

export default useIssue;