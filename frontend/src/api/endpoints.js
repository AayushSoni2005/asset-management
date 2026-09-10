export const ENDPOINTS = {
    AUTH: {
        LOGIN: "/auth/login",
        REGISTER: "/auth/register",
        VERIFY_EMAIL: "/auth/verify-email",
        RESEND_VERIFICATION: "/auth/resend-verification",
        FORGOT_PASSWORD: "/auth/forgot-password",
        RESET_PASSWORD: "/auth/reset-password",
    },

    USERS: {
        ME: "/users/me",
        CHANGE_PASSWORD: "/users/me/password",
    },

    USER_MANAGEMENT: {
        BASE: "/admin/users",
        BY_ID: (id) => `/admin/users/${id}`,
    },

    EMPLOYEES: {
        BASE: "/employees",
        BY_ID: (id) => `/employees/${id}`,
    },

    EQUIPMENT: {
        BASE: "/equipment",
        BY_ID: (id) => `/equipment/${id}`,
    },

    ISSUES: {
        BASE: "/issues",
        BY_ID: (id) => `/issues/${id}`,
    },

    WORK_ORDERS: {
        BASE: "/work-orders",
        BY_ID: (id) => `/work-orders/${id}`,
        ASSIGN: (id) => `/work-orders/${id}/assign`,
        START: (id) => `/work-orders/${id}/start`,
        COMPLETE: (id) => `/work-orders/${id}/complete`,
        CANCEL: (id) => `/work-orders/${id}/cancel`,
    },

    DASHBOARD: {
        SUMMARY: "/dashboard/summary",
    },

    ANALYTICS: {
        ISSUE_STATUS: "/analytics/issues/status",
        ISSUE_PRIORITY: "/analytics/issues/priority",

        EQUIPMENT_STATUS: "/analytics/equipment/status",
        EQUIPMENT_CATEGORY: "/analytics/equipment/category",

        WORK_ORDER_STATUS: "/analytics/work-orders/status",
        MONTHLY_WORK_ORDERS: "/analytics/work-orders/monthly",

        MONTHLY_ISSUES: "/analytics/issues/monthly",

        DEPARTMENTS: "/analytics/departments",
    },
};