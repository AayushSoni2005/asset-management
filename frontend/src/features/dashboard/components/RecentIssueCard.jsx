import PropTypes from "prop-types";

import {
    Box,
    Chip,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";

const STATUS_COLORS = {
    OPEN: "error",
    IN_PROGRESS: "warning",
    RESOLVED: "success",
    CLOSED: "default",
};

const PRIORITY_COLORS = {
    LOW: "success",
    MEDIUM: "warning",
    HIGH: "error",
    CRITICAL: "error",
};

export default function RecentIssueCard({
    issue,
}) {
    if (!issue) {
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
                    minHeight={140}
                >
                    <BugReportRoundedIcon
                        color="disabled"
                        sx={{ fontSize: 40 }}
                    />

                    <Typography color="text.secondary">
                        No recent issues
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
                        {issue.issueNumber}
                    </Typography>

                    <Chip
                        size="small"
                        label={issue.status.replace("_", " ")}
                        color={
                            STATUS_COLORS[
                                issue.status
                            ] ?? "default"
                        }
                    />
                </Box>

                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                >
                    {issue.title}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient:
                            "vertical",
                        overflow: "hidden",
                    }}
                >
                    {issue.description}
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
                        label={issue.priority}
                        color={
                            PRIORITY_COLORS[
                                issue.priority
                            ] ?? "default"
                        }
                    />

                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        {issue.createdAt}
                    </Typography>
                </Box>
            </Stack>
        </Paper>
    );
}

RecentIssueCard.propTypes = {
    issue: PropTypes.shape({
        issueNumber:
            PropTypes.string.isRequired,
        title:
            PropTypes.string.isRequired,
        description:
            PropTypes.string,
        status:
            PropTypes.string.isRequired,
        priority:
            PropTypes.string.isRequired,
        createdAt:
            PropTypes.string.isRequired,
    }),
};

RecentIssueCard.defaultProps = {
    issue: null,
};