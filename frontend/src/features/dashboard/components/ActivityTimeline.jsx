import PropTypes from "prop-types";

import {
    Box,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";

const ACTIVITY_COLORS = {
    ISSUE_CREATED: "error.main",
    ISSUE_RESOLVED: "success.main",
    EQUIPMENT_ASSIGNED: "primary.main",
    WORK_ORDER_STARTED: "warning.main",
    WORK_ORDER_COMPLETED: "success.main",
    PASSWORD_CHANGED: "secondary.main",
    DEFAULT: "text.secondary",
};

export default function ActivityTimeline({
    activities,
}) {
    if (!activities?.length) {
        return (
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    border: "1px dashed",
                    borderColor: "divider",
                    borderRadius: 3,
                }}
            >
                <Stack
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                    minHeight={180}
                >
                    <HistoryRoundedIcon
                        color="disabled"
                        sx={{
                            fontSize: 40,
                        }}
                    />

                    <Typography color="text.secondary">
                        No recent activity
                    </Typography>
                </Stack>
            </Paper>
        );
    }

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
            }}
        >
            <Stack spacing={3}>
                {activities.map(
                    (activity, index) => (
                        <Stack
                            key={activity.id}
                            direction="row"
                            spacing={2}
                            alignItems="flex-start"
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    minWidth: 20,
                                }}
                            >
                                <FiberManualRecordRoundedIcon
                                    sx={{
                                        fontSize: 12,
                                        color:
                                            ACTIVITY_COLORS[
                                                activity
                                                    .type
                                            ] ??
                                            ACTIVITY_COLORS.DEFAULT,
                                    }}
                                />

                                {index !==
                                    activities.length -
                                        1 && (
                                    <Box
                                        sx={{
                                            width: 2,
                                            flex: 1,
                                            bgcolor:
                                                "divider",
                                            minHeight: 45,
                                            mt: 0.5,
                                        }}
                                    />
                                )}
                            </Box>

                            <Box flex={1}>
                                <Typography
                                    variant="body1"
                                    fontWeight={600}
                                >
                                    {
                                        activity.title
                                    }
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        mt: 0.5,
                                    }}
                                >
                                    {
                                        activity.description
                                    }
                                </Typography>

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{
                                        display:
                                            "block",
                                        mt: 1,
                                    }}
                                >
                                    {
                                        activity.time
                                    }
                                </Typography>
                            </Box>
                        </Stack>
                    )
                )}
            </Stack>
        </Paper>
    );
}

ActivityTimeline.propTypes = {
    activities: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]).isRequired,

            type: PropTypes.string
                .isRequired,

            title: PropTypes.string
                .isRequired,

            description:
                PropTypes.string,

            time: PropTypes.string
                .isRequired,
        })
    ),
};

ActivityTimeline.defaultProps = {
    activities: [],
};