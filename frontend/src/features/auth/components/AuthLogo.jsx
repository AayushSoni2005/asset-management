import {
    Typography,
    Box,
} from "@mui/material";

export default function AuthLogo() {
    return (
        <Box
            sx={{
                textAlign: "center",
                mb: 4,
            }}
        >
            <Typography
                variant="h4"
                fontWeight="bold"
            >
                IT Asset Management
            </Typography>

            <Typography
                color="text.secondary"
                mt={1}
            >
                Sign in to continue
            </Typography>
        </Box>
    );
}