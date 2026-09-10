import Grid from "@mui/material/Grid";

import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";

import {
    AnalyticsPieChart,
    AnalyticsBarChart,
    AnalyticsLineChart,
} from "@/features/analytics/components";

import {
    useIssueStatusAnalytics,
    useIssuePriorityAnalytics,
    useEquipmentStatusAnalytics,
    useEquipmentCategoryAnalytics,
    useWorkOrderStatusAnalytics,
    useMonthlyIssueAnalytics,
    useMonthlyWorkOrderAnalytics,
    useDepartmentAnalytics,
} from "@/features/analytics/hooks";

export default function DashboardCharts() {

    const issueStatus = useIssueStatusAnalytics();
    const issuePriority = useIssuePriorityAnalytics();

    const equipmentStatus = useEquipmentStatusAnalytics();
    const equipmentCategory = useEquipmentCategoryAnalytics();

    const workOrderStatus = useWorkOrderStatusAnalytics();

    const monthlyIssues = useMonthlyIssueAnalytics();
    const monthlyWorkOrders = useMonthlyWorkOrderAnalytics();

    const departments = useDepartmentAnalytics();

    const loading =
        issueStatus.isLoading ||
        issuePriority.isLoading ||
        equipmentStatus.isLoading ||
        equipmentCategory.isLoading ||
        workOrderStatus.isLoading ||
        monthlyIssues.isLoading ||
        monthlyWorkOrders.isLoading ||
        departments.isLoading;

    if (loading) {
        return <LoadingState variant="spinner" />;
    }

    const error =
        issueStatus.error ||
        issuePriority.error ||
        equipmentStatus.error ||
        equipmentCategory.error ||
        workOrderStatus.error ||
        monthlyIssues.error ||
        monthlyWorkOrders.error ||
        departments.error;

    if (error) {
        return (
            <ErrorState
                title="Failed to load analytics"
                message={error.message}
            />
        );
    }

    return (
        <Grid container spacing={3} mt={2}>

            <Grid size={{ xs: 12, md: 6 }}>
                <AnalyticsPieChart
                    title="Issue Status"
                    data={issueStatus.data?.data ?? []}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <AnalyticsPieChart
                    title="Issue Priority"
                    data={issuePriority.data?.data ?? []}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <AnalyticsPieChart
                    title="Equipment Status"
                    data={equipmentStatus.data?.data ?? []}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <AnalyticsPieChart
                    title="Work Order Status"
                    data={workOrderStatus.data?.data ?? []}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <AnalyticsBarChart
                    title="Equipment Categories"
                    data={equipmentCategory.data?.data ?? []}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <AnalyticsBarChart
                    title="Departments"
                    data={departments.data?.data ?? []}
                />
            </Grid>

            <Grid size={12}>
                <AnalyticsLineChart
                    title="Monthly Issues"
                    data={monthlyIssues.data?.data ?? []}
                />
            </Grid>

            <Grid size={12}>
                <AnalyticsLineChart
                    title="Monthly Work Orders"
                    data={monthlyWorkOrders.data?.data ?? []}
                />
            </Grid>

        </Grid>
    );
}