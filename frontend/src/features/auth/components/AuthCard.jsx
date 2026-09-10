import {
    Paper,
    Box,
} from "@mui/material";

export default function AuthCard({ children }) {
    return (
        <Paper
            elevation={6}
            sx={{
                width: 420,
                p: 5,
                borderRadius: 4,
            }}
        >
            <Box>
                {children}
            </Box>
        </Paper>
    );
}