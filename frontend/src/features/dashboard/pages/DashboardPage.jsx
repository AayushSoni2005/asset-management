import useAuthStore from "@/features/auth/store/authStore";
import { ROLES } from "@/utils/permissions";

import AdminDashboard from "../components/AdminDashboard";
import TechnicianDashboard from "../components/TechnicianDashboard";
import EmployeeDashboard from "../components/EmployeeDashboard";

export default function DashboardPage() {
    const user = useAuthStore((state) => state.user);

    switch (user?.role) {
        case ROLES.ADMIN:
            return <AdminDashboard />;

        case ROLES.TECHNICIAN:
            return <TechnicianDashboard />;

        case ROLES.EMPLOYEE:
            return <EmployeeDashboard />;

        default:
            return null;
    }
}