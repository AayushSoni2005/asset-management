import PropTypes from "prop-types";

import {
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    Stack,
    Typography,
} from "@mui/material";

export default function ReportCard({
    title,
    icon: Icon,
    stats,
}) {

    return (
        <Card
            elevation={0}
            sx={{
                height: "100%",
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                transition: "all .25s ease",

                "&:hover": {
                    boxShadow: 8,
                    transform: "translateY(-4px)",
                },
            }}
        >
            <CardContent sx={{ p: 3 }}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                >
                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                    >
                        {Icon && (
                            <Box
                                sx={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: 3,
                                    bgcolor: "primary.lighter",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Icon
                                    color="primary"
                                    sx={{ fontSize: 28 }}
                                />
                            </Box>
                        )}

                        <Box>
                            <Typography
                                variant="h6"
                                fontWeight={700}
                            >
                                {title}
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Summary
                            </Typography>
                        </Box>
                    </Stack>

                    
                </Stack>

                <Divider sx={{ mb: 2 }} />

                <Stack spacing={2}>
    {stats.map((item) => (
        <Box
            key={item.label}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
            }}
        >
            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    flex: 1,
                    fontWeight: 500,
                }}
            >
                {item.label}
            </Typography>

            <Box
    sx={{
        minWidth: 38,
        height: 30,
        px: 1.5,
        // borderRadius: 10,
        bgcolor: item.value > 0 ? "primary.main" : "grey.200",
        color: item.value > 0 ? "#fff" : "text.primary",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
    }}
>
    {item.value}
</Box>
        </Box>
    ))}
</Stack>
            </CardContent>
        </Card>
    );
}

ReportCard.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.elementType,
    stats: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]).isRequired,
        })
    ).isRequired,
};