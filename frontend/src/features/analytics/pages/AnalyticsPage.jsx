import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";

import {
    AnalyticsPieChart,
    AnalyticsBarChart,
    AnalyticsLineChart,
} from "../components";

import {
    useIssueStatusAnalytics,
    useIssuePriorityAnalytics,
    useEquipmentStatusAnalytics,
    useEquipmentCategoryAnalytics,
    useWorkOrderStatusAnalytics,
    useMonthlyIssueAnalytics,
    useMonthlyWorkOrderAnalytics,
    useDepartmentAnalytics,
} from "../hooks";

import  useAuthStore  from "@/features/auth/store/authStore";
import { canViewAnalytics } from "@/utils/permissions";

export default function AnalyticsPage() {
    // ===========================
    // Auth
    // ===========================

    const user = useAuthStore((state) => state.user);

    if (!canViewAnalytics(user)) {
        return (
            <ErrorState
                fullPage
                title="Access Denied"
                message="You do not have permission to view analytics."
            />
        );
    }

    // ===========================
    // Queries
    // ===========================

    const issueStatus = useIssueStatusAnalytics();
    const issuePriority = useIssuePriorityAnalytics();

    const equipmentStatus = useEquipmentStatusAnalytics();
    const equipmentCategory =
        useEquipmentCategoryAnalytics();

    const workOrderStatus =
        useWorkOrderStatusAnalytics();

    const monthlyIssues =
        useMonthlyIssueAnalytics();

    const monthlyWorkOrders =
        useMonthlyWorkOrderAnalytics();

    const departments =
        useDepartmentAnalytics();

    const queries = [
        issueStatus,
        issuePriority,
        equipmentStatus,
        equipmentCategory,
        workOrderStatus,
        monthlyIssues,
        monthlyWorkOrders,
        departments,
    ];

    const isLoading = queries.some(
        (query) => query.isLoading
    );

    const errorQuery = queries.find(
        (query) => query.isError
    );

    // ===========================
    // Loading / Error
    // ===========================

    if (isLoading) {
        return <LoadingState variant="page" />;
    }

    if (errorQuery) {
        return (
            <ErrorState
                fullPage
                title="Failed to load analytics"
                message={
                    errorQuery.error?.message
                }
            />
        );
    }

    // ===========================
    // Render
    // ===========================

    return (
        <Box>
            <Typography
                variant="h4"
                mb={4}
            >
                Analytics
            </Typography>

            <Grid
                container
                spacing={3}
            >
                <Grid
                    size={{
                        xs: 12,
                        md: 6,
                    }}
                >
                    <AnalyticsPieChart
                        title="Issue Status"
                        data={
                            issueStatus.data
                                ?.data ?? []
                        }
                    />
                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        md: 6,
                    }}
                >
                    <AnalyticsPieChart
                        title="Issue Priority"
                        data={
                            issuePriority.data
                                ?.data ?? []
                        }
                    />
                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        md: 6,
                    }}
                >
                    <AnalyticsPieChart
                        title="Equipment Status"
                        data={
                            equipmentStatus
                                .data?.data ??
                            []
                        }
                    />
                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        md: 6,
                    }}
                >
                    <AnalyticsPieChart
                        title="Work Order Status"
                        data={
                            workOrderStatus
                                .data?.data ??
                            []
                        }
                    />
                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        md: 6,
                    }}
                >
                    <AnalyticsBarChart
                        title="Equipment Categories"
                        data={
                            equipmentCategory
                                .data?.data ??
                            []
                        }
                    />
                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        md: 6,
                    }}
                >
                    <AnalyticsBarChart
                        title="Employees by Department"
                        data={
                            departments.data
                                ?.data ?? []
                        }
                    />
                </Grid>

                <Grid size={12}>
                    <AnalyticsLineChart
                        title="Monthly Issues"
                        data={
                            monthlyIssues.data
                                ?.data ?? []
                        }
                    />
                </Grid>

                <Grid size={12}>
                    <AnalyticsLineChart
                        title="Monthly Work Orders"
                        data={
                            monthlyWorkOrders
                                .data?.data ??
                            []
                        }
                    />
                </Grid>
            </Grid>
        </Box>
    );
}