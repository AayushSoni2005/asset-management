import PropTypes from "prop-types";
import {
    Card,
    CardContent,
    Typography,
    Box,
} from "@mui/material";

export default function ChartCard({
    title,
    children,
}) {
    return (
        <Card
            elevation={2}
            sx={{ height: "100%" }}
        >
            <CardContent>
                <Box mb={2}>
                    <Typography
                        variant="h6"
                        fontWeight={600}
                    >
                        {title}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        width: "100%",
                        height: 320,
                    }}
                >
                    {children}
                </Box>
            </CardContent>
        </Card>
    );
}

ChartCard.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};