export const analyticsKeys = {
    all: ["analytics"],

    issueStatus: () => [...analyticsKeys.all, "issue-status"],

    issuePriority: () => [...analyticsKeys.all, "issue-priority"],

    monthlyIssues: () => [...analyticsKeys.all, "monthly-issues"],

    equipmentStatus: () => [...analyticsKeys.all, "equipment-status"],

    equipmentCategory: () => [...analyticsKeys.all, "equipment-category"],

    workOrderStatus: () => [...analyticsKeys.all, "work-order-status"],

    monthlyWorkOrders: () => [...analyticsKeys.all, "monthly-work-orders"],

    departments: () => [...analyticsKeys.all, "departments"],
};