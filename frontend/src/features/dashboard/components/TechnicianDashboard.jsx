import {
    Box,
    Grid,
    Stack,
    Typography,
} from "@mui/material";

import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import SummaryCard from "./SummaryCard";
import RecentIssueCard from "./RecentIssueCard";
import RecentWorkOrderCard from "./RecentWorkOrderCard";
import ActivityTimeline from "./ActivityTimeline";

export default function TechnicianDashboard() {
    const summary = {
        assignedWorkOrders: 3,
        pendingIssues: 5,
        inProgress: 2,
        completedToday: 4,
    };

    const recentWorkOrders = [
        {
            workOrderNumber: "WO-1001",
            title: "Replace Laptop Battery",
            equipment: "Dell Latitude 5440",
            priority: "HIGH",
            status: "IN_PROGRESS",
            assignedAt: "2 hours ago",
        },
        {
            workOrderNumber: "WO-1002",
            title: "Install Windows Updates",
            equipment: "HP EliteBook 840",
            priority: "MEDIUM",
            status: "OPEN",
            assignedAt: "Yesterday",
        },
    ];

    const recentIssues = [
        {
            issueNumber: "ISS-1024",
            title: "Laptop not booting",
            description: "Dell Latitude stuck on startup.",
            status: "OPEN",
            priority: "HIGH",
            createdAt: "3 hours ago",
        },
    ];

    const recentActivities = [
        {
            id: 1,
            type: "WORK_ORDER_STARTED",
            title: "Started Work Order WO-1001",
            description: "Battery replacement initiated.",
            time: "2 hours ago",
        },
        {
            id: 2,
            type: "ISSUE_ASSIGNED",
            title: "New Issue Assigned",
            description: "Laptop not booting.",
            time: "Yesterday",
        },
    ];

    return (
        <Box>
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
                mb={4}
            >
                Here's an overview of your assigned work and recent activities.
            </Typography>

            <Grid
                container
                spacing={3}
                mb={4}
            >
                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <SummaryCard
                        title="Assigned Work Orders"
                        value={summary.assignedWorkOrders}
                        subtitle="Active Assignments"
                        icon={AssignmentRoundedIcon}
                        color="#2563EB"
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <SummaryCard
                        title="Pending Issues"
                        value={summary.pendingIssues}
                        subtitle="Awaiting Action"
                        icon={BugReportRoundedIcon}
                        color="#DC2626"
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <SummaryCard
                        title="In Progress"
                        value={summary.inProgress}
                        subtitle="Currently Working"
                        icon={BuildRoundedIcon}
                        color="#D97706"
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <SummaryCard
                        title="Completed Today"
                        value={summary.completedToday}
                        subtitle="Finished Tasks"
                        icon={CheckCircleRoundedIcon}
                        color="#059669"
                    />
                </Grid>
            </Grid>

            <Grid
                container
                spacing={3}
            >
                <Grid size={{ xs: 12, lg: 6 }}>
                    <Stack spacing={2}>
                        <Typography
                            variant="h6"
                            fontWeight={600}
                        >
                            Recent Work Orders
                        </Typography>

                        {recentWorkOrders.length ? (
                            recentWorkOrders.map((workOrder) => (
                                <RecentWorkOrderCard
                                    key={workOrder.workOrderNumber}
                                    workOrder={workOrder}
                                />
                            ))
                        ) : (
                            <RecentWorkOrderCard />
                        )}
                    </Stack>
                </Grid>

                <Grid size={{ xs: 12, lg: 6 }}>
                    <Stack spacing={2}>
                        <Typography
                            variant="h6"
                            fontWeight={600}
                        >
                            Recent Issues
                        </Typography>

                        {recentIssues.length ? (
                            recentIssues.map((issue) => (
                                <RecentIssueCard
                                    key={issue.issueNumber}
                                    issue={issue}
                                />
                            ))
                        ) : (
                            <RecentIssueCard />
                        )}
                    </Stack>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Stack spacing={2}>
                        <Typography
                            variant="h6"
                            fontWeight={600}
                        >
                            Recent Activity
                        </Typography>

                        <ActivityTimeline
                            activities={recentActivities}
                        />
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}