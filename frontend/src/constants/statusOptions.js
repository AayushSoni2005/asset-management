export const ALL_OPTION = {
    value: "",
    label: "All",
};

// Employee
export const EMPLOYEE_STATUS_OPTIONS = [
    ALL_OPTION,
    {
        value: "ACTIVE",
        label: "Active",
    },
    {
        value: "INACTIVE",
        label: "Inactive",
    },
    {
        value: "ON_LEAVE",
        label: "On Leave",
    },
];

// Equipment
export const EQUIPMENT_STATUS_OPTIONS = [
    ALL_OPTION,
    {
        value: "AVAILABLE",
        label: "Available",
    },
    {
        value: "ASSIGNED",
        label: "Assigned",
    },
    {
        value: "MAINTENANCE",
        label: "Maintenance",
    },
    {
        value: "RETIRED",
        label: "Retired",
    },
    {
        value: "LOST",
        label: "Lost",
    },
    {
        value: "DAMAGED",
        label: "Damaged",
    },
];

// Issue
export const ISSUE_STATUS_OPTIONS = [
    ALL_OPTION,
    {
        value: "OPEN",
        label: "Open",
    },
    {
        value: "IN_PROGRESS",
        label: "In Progress",
    },
    {
        value: "RESOLVED",
        label: "Resolved",
    },
    {
        value: "CLOSED",
        label: "Closed",
    },
];

// Work Order
export const WORK_ORDER_STATUS_OPTIONS = [
    ALL_OPTION,
    {
        value: "PENDING",
        label: "Pending",
    },
    {
        value: "ASSIGNED",
        label: "Assigned",
    },
    {
        value: "IN_PROGRESS",
        label: "In Progress",
    },
    {
        value: "COMPLETED",
        label: "Completed",
    },
    {
        value: "CANCELLED",
        label: "Cancelled",
    },
];