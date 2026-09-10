export const ROLES = {
    ADMIN: "ADMIN",
    TECHNICIAN: "TECHNICIAN",
    EMPLOYEE: "EMPLOYEE",
};

export const ROLE_GROUPS = {
    ALL: [
        ROLES.ADMIN,
        ROLES.TECHNICIAN,
        ROLES.EMPLOYEE,
    ],

    ADMIN_ONLY: [
        ROLES.ADMIN,
    ],

    ADMIN_TECHNICIAN: [
        ROLES.ADMIN,
        ROLES.TECHNICIAN,
    ],
};

export const hasRole = (user, ...roles) =>
    !!user && roles.includes(user.role);

export const isAdmin = (user) =>
    hasRole(user, ROLES.ADMIN);

export const isTechnician = (user) =>
    hasRole(user, ROLES.TECHNICIAN);

export const isEmployee = (user) =>
    hasRole(user, ROLES.EMPLOYEE);

// ===========================
// Employee
// ===========================

export const canManageEmployees = (user) =>
    hasRole(user, ...ROLE_GROUPS.ADMIN_ONLY);

// ===========================
// User Management
// ===========================

export const canManageUsers = (user) =>
    hasRole(user, ...ROLE_GROUPS.ADMIN_ONLY);

// ===========================
// Equipment
// ===========================

export const canManageEquipment = (user) =>
    hasRole(user, ...ROLE_GROUPS.ADMIN_ONLY);

// ===========================
// Issues
// ===========================

export const canCreateIssue = (user) =>
    hasRole(user, ...ROLE_GROUPS.ALL);

export const canUpdateIssue = (user) =>
    hasRole(
        user,
        ...ROLE_GROUPS.ADMIN_TECHNICIAN
    );

export const canDeleteIssue = (user) =>
    hasRole(user, ...ROLE_GROUPS.ADMIN_ONLY);

export const canAssignIssue = (user) =>
    hasRole(user, ...ROLE_GROUPS.ADMIN_ONLY);

export const canChangeIssuePriority = (user) =>
    hasRole(user, ...ROLE_GROUPS.ADMIN_ONLY);

export const canViewAllIssues = (user) =>
    hasRole(user, ...ROLE_GROUPS.ADMIN_ONLY);

export const canViewAssignedIssues = (user) =>
    hasRole(user, ROLES.TECHNICIAN);

export const canViewOwnIssues = (user) =>
    hasRole(user, ROLES.EMPLOYEE);

// ===========================
// Work Orders
// ===========================

export const canManageWorkOrders = (user) =>
    hasRole(user, ...ROLE_GROUPS.ADMIN_ONLY);

export const canOperateWorkOrders = (user) =>
    hasRole(
        user,
        ...ROLE_GROUPS.ADMIN_TECHNICIAN
    );

// ===========================
// Analytics
// ===========================

export const canViewAnalytics = (user) =>
    hasRole(user, ...ROLE_GROUPS.ADMIN_ONLY);

// ===========================
// Dashboard
// ===========================

export const canViewDashboard = (user) =>
    !!user;