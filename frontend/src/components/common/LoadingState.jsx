import PropTypes from "prop-types";

import {
    Box,
    CircularProgress,
    Skeleton,
    Stack,
    Typography,
} from "@mui/material";

export default function LoadingState({
    variant = "spinner",
    message = "Loading...",
    rows = 5,
    cards = 4,
    size = 48,
}) {
    if (variant === "table") {
        return (
            <Stack spacing={1}>
                {Array.from({ length: rows }).map((_, index) => (
                    <Skeleton
                        key={index}
                        variant="rounded"
                        height={56}
                    />
                ))}
            </Stack>
        );
    }

    if (variant === "cards") {
        return (
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        lg: "repeat(4, 1fr)",
                    },
                    gap: 2,
                }}
            >
                {Array.from({ length: cards }).map((_, index) => (
                    <Skeleton
                        key={index}
                        variant="rounded"
                        height={140}
                    />
                ))}
            </Box>
        );
    }

    const fullPage = variant === "page";

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: fullPage ? "column" : "row",
                justifyContent: "center",
                alignItems: "center",
                minHeight: fullPage ? "60vh" : "auto",
                gap: 2,
                py: fullPage ? 0 : 4,
            }}
        >
            <CircularProgress size={size} />

            <Typography
                variant="body2"
                color="text.secondary"
            >
                {message}
            </Typography>
        </Box>
    );
}

LoadingState.propTypes = {
    variant: PropTypes.oneOf([
        "spinner",
        "page",
        "table",
        "cards",
    ]),
    message: PropTypes.string,
    rows: PropTypes.number,
    cards: PropTypes.number,
    size: PropTypes.number,
};