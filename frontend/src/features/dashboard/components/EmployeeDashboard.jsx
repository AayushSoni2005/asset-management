import {
    Box,
    Grid,
    Stack,
    Typography,
} from "@mui/material";

import LaptopMacRoundedIcon from "@mui/icons-material/LaptopMacRounded";
import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";

import SummaryCard from "./SummaryCard";
import RecentIssueCard from "./RecentIssueCard";
import AssignedEquipmentCard from "./AssignedEquipmentCard";
import ActivityTimeline from "./ActivityTimeline";

export default function EmployeeDashboard() {
    const summary = {
        assignedEquipment: 2,
        openIssues: 1,
        workOrders: 1,
        pendingRequests: 0,
    };

    const recentIssues = [
        {
            issueNumber: "ISS-1024",
            title: "Laptop not booting",
            description: "Device is stuck on the Dell logo during startup.",
            status: "OPEN",
            priority: "HIGH",
            createdAt: "2 hours ago",
        },
        {
            issueNumber: "ISS-1020",
            title: "Keyboard malfunction",
            description: "Several keys are not responding properly.",
            status: "IN_PROGRESS",
            priority: "MEDIUM",
            createdAt: "Yesterday",
        },
    ];

    const assignedEquipment = [
        {
            name: "Dell Latitude 5440",
            assetTag: "AST-001245",
            category: "Laptop",
            status: "ASSIGNED",
            assignedDate: "12 Jul 2026",
        },
        {
            name: "Logitech MX Master 3",
            assetTag: "AST-001501",
            category: "Mouse",
            status: "ASSIGNED",
            assignedDate: "12 Jul 2026",
        },
    ];

    const recentActivities = [
        {
            id: 1,
            type: "ISSUE_CREATED",
            title: "Issue #ISS-1024 created",
            description: "Laptop not booting.",
            time: "2 hours ago",
        },
        {
            id: 2,
            type: "WORK_ORDER_STARTED",
            title: "Work Order WO-204 assigned",
            description: "Assigned to IT Support.",
            time: "Yesterday",
        },
        {
            id: 3,
            type: "EQUIPMENT_ASSIGNED",
            title: "Dell Latitude 5440 assigned",
            description: "Asset Tag AST-001245",
            time: "12 Jul 2026",
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
                Welcome back! Here's an overview of your assigned assets and support requests.
            </Typography>

            <Grid
                container
                spacing={3}
                mb={4}
            >
                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <SummaryCard
                        title="My Equipment"
                        value={summary.assignedEquipment}
                        subtitle="Assigned Assets"
                        icon={LaptopMacRoundedIcon}
                        color="#2563EB"
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <SummaryCard
                        title="Open Issues"
                        value={summary.openIssues}
                        subtitle="Awaiting Resolution"
                        icon={BugReportRoundedIcon}
                        color="#DC2626"
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <SummaryCard
                        title="Work Orders"
                        value={summary.workOrders}
                        subtitle="Active Tasks"
                        icon={AssignmentRoundedIcon}
                        color="#D97706"
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <SummaryCard
                        title="Pending Requests"
                        value={summary.pendingRequests}
                        subtitle="Waiting Approval"
                        icon={PendingActionsRoundedIcon}
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
                            Recent Issues
                        </Typography>

                        {recentIssues.length > 0 ? (
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

                <Grid size={{ xs: 12, lg: 6 }}>
                    <Stack spacing={2}>
                        <Typography
                            variant="h6"
                            fontWeight={600}
                        >
                            Assigned Equipment
                        </Typography>

                        {assignedEquipment.length > 0 ? (
                            assignedEquipment.map((equipment) => (
                                <AssignedEquipmentCard
                                    key={equipment.assetTag}
                                    equipment={equipment}
                                />
                            ))
                        ) : (
                            <AssignedEquipmentCard />
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