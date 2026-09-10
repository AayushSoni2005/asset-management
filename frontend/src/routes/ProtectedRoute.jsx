import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthStore from "../features/auth/store/authStore";

export default function ProtectedRoute({ allowedRoles = [] }) {
    const {
        isInitialized,
        isAuthenticated,
        user,
    } = useAuthStore();

    const location = useLocation();

    // Wait until authentication has been initialized
    if (!isInitialized) {
        return null;
    }

    // User is not authenticated
    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    // Role-based authorization
    if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(user?.role)
    ) {
        return (
            <Navigate
                to="/403"
                replace
            />
        );
    }

    return <Outlet />;
}