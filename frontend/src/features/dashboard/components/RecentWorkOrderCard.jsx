import PropTypes from "prop-types";

import {
    Box,
    Chip,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";

const STATUS_COLORS = {
    OPEN: "primary",
    IN_PROGRESS: "warning",
    COMPLETED: "success",
    CANCELLED: "default",
};

const PRIORITY_COLORS = {
    LOW: "success",
    MEDIUM: "warning",
    HIGH: "error",
    CRITICAL: "error",
};

export default function RecentWorkOrderCard({
    workOrder,
}) {
    if (!workOrder) {
        return (
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    borderRadius: 3,
                    border: "1px dashed",
                    borderColor: "divider",
                }}
            >
                <Stack
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                    minHeight={140}
                >
                    <AssignmentRoundedIcon
                        color="disabled"
                        sx={{ fontSize: 40 }}
                    />

                    <Typography color="text.secondary">
                        No recent work orders
                    </Typography>
                </Stack>
            </Paper>
        );
    }

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2.5,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                transition: "all .2s",

                "&:hover": {
                    borderColor: "primary.main",
                    boxShadow: 2,
                },
            }}
        >
            <Stack spacing={1.5}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography
                        variant="subtitle2"
                        color="primary.main"
                        fontWeight={700}
                    >
                        {workOrder.workOrderNumber}
                    </Typography>

                    <Chip
                        size="small"
                        label={workOrder.status.replace("_", " ")}
                        color={
                            STATUS_COLORS[
                                workOrder.status
                            ] ?? "default"
                        }
                    />
                </Box>

                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                >
                    {workOrder.title}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    noWrap
                >
                    {workOrder.equipment}
                </Typography>

                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={0.5}
                >
                    <Chip
                        size="small"
                        variant="outlined"
                        label={workOrder.priority}
                        color={
                            PRIORITY_COLORS[
                                workOrder.priority
                            ] ?? "default"
                        }
                    />

                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        {workOrder.assignedAt}
                    </Typography>
                </Box>
            </Stack>
        </Paper>
    );
}

RecentWorkOrderCard.propTypes = {
    workOrder: PropTypes.shape({
        workOrderNumber:
            PropTypes.string.isRequired,
        title:
            PropTypes.string.isRequired,
        equipment:
            PropTypes.string.isRequired,
        priority:
            PropTypes.string.isRequired,
        status:
            PropTypes.string.isRequired,
        assignedAt:
            PropTypes.string.isRequired,
    }),
};

RecentWorkOrderCard.defaultProps = {
    workOrder: null,
};