import { useQuery } from "@tanstack/react-query";

import issueService from "../services/issueService";
import { issueKeys } from "../queryKeys";

const useIssues = () => {
    return useQuery({
        queryKey: issueKeys.list(),
        queryFn: issueService.getIssues,
    });
};

export default useIssues;