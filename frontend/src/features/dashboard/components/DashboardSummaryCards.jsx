import PropTypes from "prop-types";

import Grid from "@mui/material/Grid";

import PeopleIcon from "@mui/icons-material/People";
import ComputerIcon from "@mui/icons-material/Computer";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import AssignmentIcon from "@mui/icons-material/Assignment";

import SummaryCard from "./SummaryCard";

export default function DashboardSummaryCards({ summary }) {
    return (
        <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <SummaryCard
                    title="Employees"
                    value={summary.totalEmployees}
                    subtitle="Registered employees"
                    icon={PeopleIcon}
                    color="#2563eb"
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <SummaryCard
                    title="Equipment"
                    value={summary.totalEquipment}
                    subtitle="Assets in inventory"
                    icon={ComputerIcon}
                    color="#16a34a"
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <SummaryCard
                    title="Open Issues"
                    value={summary.openIssues}
                    subtitle="Require attention"
                    icon={ReportProblemIcon}
                    color="#dc2626"
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <SummaryCard
                    title="Pending Work Orders"
                    value={summary.pendingWorkOrders}
                    subtitle="Awaiting completion"
                    icon={AssignmentIcon}
                    color="#ea580c"
                />
            </Grid>
        </Grid>
    );
}

DashboardSummaryCards.propTypes = {
    summary: PropTypes.shape({
        totalEmployees: PropTypes.number.isRequired,
        totalEquipment: PropTypes.number.isRequired,
        openIssues: PropTypes.number.isRequired,
        pendingWorkOrders: PropTypes.number.isRequired,
    }).isRequired,
};