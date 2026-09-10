import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import MainLayout from "../components/layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import { ROLES } from "@/utils/permissions";

// ======================
// Authentication Pages
// ======================
const LoginPage = lazy(() => import("../features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("../features/auth/pages/RegisterPage"));
const VerifyEmailPage = lazy(() => import("../features/auth/pages/VerifyEmailPage"));
const ForgotPasswordPage = lazy(() => import("../features/auth/pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("../features/auth/pages/ResetPasswordPage"));
const LogoutPage = lazy(() => import("../features/auth/pages/LogoutPage"));

// ======================
// Application Pages
// ======================
const DashboardPage = lazy(() => import("../features/dashboard/pages/DashboardPage"));
const EmployeePage = lazy(() => import("../features/employee/pages/EmployeePage"));
const EquipmentPage = lazy(() => import("../features/equipment/pages/EquipmentPage"));
const IssuePage = lazy(() => import("../features/issue/pages/IssuePage"));
const WorkOrderPage = lazy(() => import("../features/workorder/pages/WorkOrderPage"));
const AnalyticsPage = lazy(() => import("../features/analytics/pages/AnalyticsPage"));
const ProfilePage = lazy(() => import("../features/profile/pages/ProfilePage"));
const UserManagementPage = lazy(() => import("../features/user/pages/UserManagementPage"));


// ======================
// Error Pages
// ======================
const ForbiddenPage = lazy(() => import("../pages/ForbiddenPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>

                    {/* Redirect */}
                    <Route
                        path="/"
                        element={<Navigate to="/dashboard" replace />}
                    />

                    {/* Public Routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/verify-email" element={<VerifyEmailPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                    <Route
    path="/logout"
    element={<LogoutPage />}
/>

                    {/* Protected */}
                    <Route element={<ProtectedRoute />}>
                        <Route element={<MainLayout />}>

                            {/* ================================================= */}
                            {/* ALL AUTHENTICATED USERS */}
                            {/* ================================================= */}
                            <Route
                                element={
                                    <ProtectedRoute
                                        allowedRoles={[
                                            ROLES.ADMIN,
                                            ROLES.TECHNICIAN,
                                            ROLES.EMPLOYEE,
                                        ]}
                                    />
                                }
                            >
                                <Route path="/dashboard" element={<DashboardPage />} />
                                <Route path="/issues" element={<IssuePage />} />
                                <Route path="/profile" element={<ProfilePage />} />
                            </Route>

                            {/* ================================================= */}
                            {/* ADMIN & TECHNICIAN */}
                            {/* ================================================= */}
                            <Route
                                element={
                                    <ProtectedRoute
                                        allowedRoles={[
                                            ROLES.ADMIN,
                                            ROLES.TECHNICIAN,
                                        ]}
                                    />
                                }
                            >
                                <Route path="/work-orders" element={<WorkOrderPage />} />
                            </Route>

                            {/* ================================================= */}
                            {/* ADMIN ONLY */}
                            {/* ================================================= */}
                            <Route
                                element={
                                    <ProtectedRoute
                                        allowedRoles={[ROLES.ADMIN]}
                                    />
                                }
                            >
                                <Route path="/employees" element={<EmployeePage />} />
                                <Route path="/users" element={<UserManagementPage />} />
                                <Route path="/equipment" element={<EquipmentPage />} />
                                <Route path="/analytics" element={<AnalyticsPage />} />
                            </Route>

                        </Route>
                    </Route>

                    {/* Error Pages */}
                    <Route path="/403" element={<ForbiddenPage />} />
                    <Route path="*" element={<NotFoundPage />} />

                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}