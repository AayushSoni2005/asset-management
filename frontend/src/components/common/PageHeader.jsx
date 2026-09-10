import PropTypes from "prop-types";

import {
    Stack,
    Typography,
} from "@mui/material";

export default function PageHeader({
    title,
    subtitle,
    action = null,
}) {
    return (
        <Stack
            direction={{
                xs: "column",
                sm: "row",
            }}
            spacing={2}
            sx={{
                justifyContent: "space-between",
                alignItems: {
                    xs: "flex-start",
                    sm: "center",
                },
                mb: 3,
            }}
        >
            <Stack spacing={0.5}>
                <Typography
                    variant="h4"
                    sx={{ fontWeight: 600 }}
                >
                    {title}
                </Typography>

                {subtitle && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {subtitle}
                    </Typography>
                )}
            </Stack>

            {action}
        </Stack>
    );
}

PageHeader.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    action: PropTypes.node,
};