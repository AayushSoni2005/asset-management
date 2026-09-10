import PropTypes from "prop-types";

import {
    Box,
    Stack,
    Typography,
} from "@mui/material";

import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";

export default function EmptyState({
    icon = null,
    title = "No data found",
    description = "There is nothing to display.",
    primaryAction = null,
    secondaryAction = null,
    fullPage = false,
}) {
    return (
        <Box
            sx={{
                py: fullPage ? 0 : 6,
                px: fullPage ? 2 : 0,
                minHeight: fullPage ? "60vh" : "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Stack
                spacing={2}
                alignItems="center"
                textAlign="center"
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        color: "text.secondary",
                        fontSize: 72,
                    }}
                >
                    {icon ?? (
                        <InboxOutlinedIcon fontSize="inherit" />
                    )}
                </Box>

                <Typography
                    variant="h6"
                    fontWeight={600}
                >
                    {title}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ maxWidth: 450 }}
                >
                    {description}
                </Typography>

                {(primaryAction || secondaryAction) && (
                    <Stack
                        direction="row"
                        spacing={2}
                        mt={2}
                    >
                        {secondaryAction}
                        {primaryAction}
                    </Stack>
                )}
            </Stack>
        </Box>
    );
}

EmptyState.propTypes = {
    icon: PropTypes.node,
    title: PropTypes.string,
    description: PropTypes.string,
    primaryAction: PropTypes.node,
    secondaryAction: PropTypes.node,
    fullPage: PropTypes.bool,
};