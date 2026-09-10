import { useEffect } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { useNavigate } from "react-router-dom";

import useAuthStore from "@/features/auth/store/authStore";

export default function LogoutPage() {
    const navigate = useNavigate();

    const logout = useAuthStore(
        (state) => state.logout
    );

    useEffect(() => {
        logout();
    }, [logout]);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "grey.100",
                p: 3,
            }}
        >
            <Card
                sx={{
                    width: 420,
                    borderRadius: 4,
                    boxShadow: 8,
                }}
            >
                <CardContent
                    sx={{
                        textAlign: "center",
                        p: 5,
                    }}
                >
                    <LockOutlinedIcon
                        color="primary"
                        sx={{
                            fontSize: 72,
                            mb: 2,
                        }}
                    />

                    <Typography
                        variant="h4"
                        fontWeight={700}
                        gutterBottom
                    >
                        Logged Out
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{ mb: 4 }}
                    >
                        Your session has ended
                        successfully.
                        <br />
                        Thank you for using the
                        Asset Management System.
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={() =>
                            navigate("/login")
                        }
                    >
                        Sign In Again
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
}