import PropTypes from "prop-types";

import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Stack,
    Typography,
} from "@mui/material";

import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function ErrorState({
    title = "Something went wrong",
    message = "An unexpected error occurred.",
    onRetry,
    fullPage = false,
    icon = null,
}) {
    const alert = (
        <Alert
            severity="error"
            icon={icon ?? <ErrorOutlinedIcon />}
            sx={{ width: "100%" }}
        >
            <AlertTitle>{title}</AlertTitle>

            <Typography variant="body2">
                {message}
            </Typography>

            {onRetry && (
                <Button
                    sx={{ mt: 2 }}
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<RefreshIcon />}
                    onClick={onRetry}
                >
                    Try Again
                </Button>
            )}
        </Alert>
    );

    return fullPage ? (
        <Box
            sx={{
                minHeight: "60vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                px: 2,
            }}
        >
            <Stack
                sx={{
                    width: "100%",
                    maxWidth: 600,
                }}
            >
                {alert}
            </Stack>
        </Box>
    ) : (
        alert
    );
}

ErrorState.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    onRetry: PropTypes.func,
    fullPage: PropTypes.bool,
    icon: PropTypes.node,
};