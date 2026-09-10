import api from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";

const get = (url) =>
    api.get(url).then((response) => response.data);

export const analyticsService = {
    getIssueStatus() {
        return get(
            ENDPOINTS.ANALYTICS.ISSUE_STATUS
        );
    },

    getIssuePriority() {
        return get(
            ENDPOINTS.ANALYTICS.ISSUE_PRIORITY
        );
    },

    getMonthlyIssues() {
        return get(
            ENDPOINTS.ANALYTICS.MONTHLY_ISSUES
        );
    },

    getEquipmentStatus() {
        return get(
            ENDPOINTS.ANALYTICS.EQUIPMENT_STATUS
        );
    },

    getEquipmentCategory() {
        return get(
            ENDPOINTS.ANALYTICS.EQUIPMENT_CATEGORY
        );
    },

    getWorkOrderStatus() {
        return get(
            ENDPOINTS.ANALYTICS.WORK_ORDER_STATUS
        );
    },

    getMonthlyWorkOrders() {
        return get(
            ENDPOINTS.ANALYTICS.MONTHLY_WORK_ORDERS
        );
    },

    getDepartments() {
        return get(
            ENDPOINTS.ANALYTICS.DEPARTMENTS
        );
    },
};