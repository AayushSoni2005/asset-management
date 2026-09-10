import {
    Alert,
    Box,
    CircularProgress,
    Grid,
    Typography,
} from "@mui/material";

import {
    Assignment,
    Inventory2,
    People,
    ReportProblem,
} from "@mui/icons-material";

import { DashboardSummaryCards } from "./";
import useDashboardSummary from "../hooks/useDashboardSummary";

import ReportCard from "@/features/report/components/ReportCard";
import {
    useEmployeeReport,
    useEquipmentReport,
    useIssueReport,
    useWorkOrderReport,
} from "@/features/report/hooks/useReports";

export default function AdminDashboard() {
    const {
        data,
        isLoading,
        isError,
        error,
    } = useDashboardSummary();

    const { data: equipment } = useEquipmentReport();
    const { data: issues } = useIssueReport();
    const { data: workOrders } = useWorkOrderReport();
    const { data: employees } = useEmployeeReport();

    if (isLoading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                py={8}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (isError) {
        return (
            <Alert severity="error">
                {error.message}
            </Alert>
        );
    }

    const summary = data.data;

    return (
    <Box>
        <Box mb={4}>
            <Typography
                variant="h4"
                fontWeight={700}
                gutterBottom
            >
                Dashboard
            </Typography>

            <Typography
                variant="body1"
                color="text.secondary"
            >
                Welcome back! Here's an overview of your IT Asset Management
                System.
            </Typography>
        </Box>

        <DashboardSummaryCards summary={summary} />

        <Box mt={5} mb={4} >
            <Typography
                variant="h5"
                fontWeight={600}
            >
                Reports Overview
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
            >
                Quick insights into equipment, issues, work orders, and employees.
            </Typography>
        </Box>

        <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
                <ReportCard
                    title="Equipment Report"
                    icon={Inventory2}
                    stats={[
                        {
                            label: "Total Equipment",
                            value: equipment?.data?.totalEquipment ?? 0,
                        },
                        {
                            label: "Assigned",
                            value: equipment?.data?.assignedEquipment ?? 0,
                        },
                        {
                            label: "Available",
                            value: equipment?.data?.availableEquipment ?? 0,
                        },
                        {
                            label: "Active",
                            value: equipment?.data?.activeEquipment ?? 0,
                        },
                        {
                            label: "Inactive",
                            value: equipment?.data?.inactiveEquipment ?? 0,
                        },
                    ]}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <ReportCard
                    title="Issue Report"
                    icon={ReportProblem}
                    stats={[
                        {
                            label: "Total Issues",
                            value: issues?.data?.totalIssues ?? 0,
                        },
                        {
                            label: "Open",
                            value: issues?.data?.openIssues ?? 0,
                        },
                        {
                            label: "In Progress",
                            value: issues?.data?.inProgressIssues ?? 0,
                        },
                        {
                            label: "Resolved",
                            value: issues?.data?.resolvedIssues ?? 0,
                        },
                    ]}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <ReportCard
                    title="Work Order Report"
                    icon={Assignment}
                    stats={[
                        {
                            label: "Total Work Orders",
                            value: workOrders?.data?.totalWorkOrders ?? 0,
                        },
                        {
                            label: "Pending",
                            value: workOrders?.data?.pendingWorkOrders ?? 0,
                        },
                        {
                            label: "Assigned",
                            value: workOrders?.data?.assignedWorkOrders ?? 0,
                        },
                        {
                            label: "In Progress",
                            value: workOrders?.data?.inProgressWorkOrders ?? 0,
                        },
                        {
                            label: "Completed",
                            value: workOrders?.data?.completedWorkOrders ?? 0,
                        },
                    ]}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <ReportCard
                    title="Employee Report"
                    icon={People}
                    stats={[
                        {
                            label: "Total Employees",
                            value: employees?.data?.totalEmployees ?? 0,
                        },
                        {
                            label: "Active",
                            value: employees?.data?.activeEmployees ?? 0,
                        },
                        {
                            label: "Inactive",
                            value: employees?.data?.inactiveEmployees ?? 0,
                        },
                        {
                            label: "Admins",
                            value: employees?.data?.adminCount ?? 0,
                        },
                        {
                            label: "Technicians",
                            value: employees?.data?.technicianCount ?? 0,
                        },
                        {
                            label: "Employees",
                            value: employees?.data?.employeeCount ?? 0,
                        },
                    ]}
                />
            </Grid>
        </Grid>
    </Box>
);
}