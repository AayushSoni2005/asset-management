import api from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";

const get = (url) =>
    api.get(url).then((response) => response.data);

const dashboardService = {
    getSummary() {
        return get(
            ENDPOINTS.DASHBOARD.SUMMARY
        );
    },
};

export default dashboardService;