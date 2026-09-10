import PropTypes from "prop-types";

import {
    Box,
    Card,
    CardContent,
    Typography,
} from "@mui/material";

export default function SummaryCard({
    title,
    subtitle,
    value,
    icon: Icon,
    color = "#2563EB",
}) {
    return (
        <Card
            elevation={0}
            sx={{
                height: "100%",
                minHeight: 165,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                transition: "all 0.2s ease",

                "&:hover": {
                    borderColor: color,
                    transform: "translateY(-3px)",
                    boxShadow: 3,
                },
            }}
        >
            <CardContent
                sx={{
                    p: 3,
                    "&:last-child": {
                        pb: 3,
                    },
                }}
            >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    gap={2}
                >
                    <Box flex={1}>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            fontWeight={600}
                        >
                            {title}
                        </Typography>

                        <Typography
                            variant="h4"
                            fontWeight={800}
                            lineHeight={1}
                            sx={{ my: 1.5 }}
                        >
                            {value}
                        </Typography>

                        {subtitle && (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                {subtitle}
                            </Typography>
                        )}
                    </Box>

                    {Icon && (
                        <Box
                            sx={{
                                width: 52,
                                height: 52,
                                borderRadius: 2,
                                bgcolor: `${color}15`,
                                color,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                            }}
                        >
                            <Icon
                                sx={{
                                    fontSize: 28,
                                }}
                            />
                        </Box>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}

SummaryCard.propTypes = {
    title: PropTypes.string.isRequired,

    subtitle: PropTypes.string,

    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]).isRequired,

    icon: PropTypes.elementType,

    color: PropTypes.string,
};

SummaryCard.defaultProps = {
    subtitle: "",
    color: "#2563EB",
};