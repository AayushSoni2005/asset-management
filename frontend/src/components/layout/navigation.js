import {
    Assignment,
    BarChart,
    Dashboard,
    Inventory2,
    ManageAccounts,
    People,
    Person,
    ReportProblem,
} from "@mui/icons-material";

import { ROLE_GROUPS } from "@/utils/permissions";

export const navigation = [
    {
        label: "Dashboard",
        path: "/dashboard",
        icon: Dashboard,
        roles: ROLE_GROUPS.ALL,
    },
    {
        label: "Employees",
        path: "/employees",
        icon: People,
        roles: ROLE_GROUPS.ADMIN_ONLY,
    },
    {
        label: "Users",
        path: "/users",
        icon: ManageAccounts,
        roles: ROLE_GROUPS.ADMIN_ONLY,
    },
    {
        label: "Equipment",
        path: "/equipment",
        icon: Inventory2,
        roles: ROLE_GROUPS.ADMIN_ONLY,
    },
    {
        label: "Issues",
        path: "/issues",
        icon: ReportProblem,
        roles: ROLE_GROUPS.ALL,
    },
    {
        label: "Work Orders",
        path: "/work-orders",
        icon: Assignment,
        roles: ROLE_GROUPS.ADMIN_TECHNICIAN,
    },
    {
        label: "Analytics",
        path: "/analytics",
        icon: BarChart,
        roles: ROLE_GROUPS.ADMIN_ONLY,
    },
    {
        label: "Profile",
        path: "/profile",
        icon: Person,
        roles: ROLE_GROUPS.ALL,
    },
];