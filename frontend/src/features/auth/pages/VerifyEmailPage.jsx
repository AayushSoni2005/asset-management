import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import useVerifyEmail from "../hooks/useVerifyEmail";

export default function VerifyEmailPage() {
    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");
const email = searchParams.get("email");

    const {
        mutate,
        isPending,
        isSuccess,
        isError,
        error,
    } = useVerifyEmail();

    useEffect(() => {
        if (token) {
            mutate({
    token,
    email,
});
        }
    }, [token,email, mutate]);

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        width: "100%",
                        p: 4,
                    }}
                >
                    <Stack spacing={3} alignItems="center">
                        <Typography
                            variant="h4"
                            fontWeight={700}
                            textAlign="center"
                        >
                            Email Verification
                        </Typography>

                        {!token && (
                            <Alert severity="error" sx={{ width: "100%" }}>
                                Invalid verification link.
                            </Alert>
                        )}

                        {isPending && (
                            <>
                                <CircularProgress />
                                <Typography>
                                    Verifying your email...
                                </Typography>
                            </>
                        )}

                        {isSuccess && (
                            <>
                                <Alert severity="success" sx={{ width: "100%" }}>
                                    Your email has been verified successfully.
                                </Alert>

                                <Button
                                    component={Link}
                                    to="/login"
                                    variant="contained"
                                    fullWidth
                                >
                                    Continue to Login
                                </Button>
                            </>
                        )}

                        {isError && (
                            <>
                                <Alert severity="error" sx={{ width: "100%" }}>
                                    {error.response?.data?.message ??
                                        "Unable to verify your email."}
                                </Alert>

                                <Button
                                    component={Link}
                                    to="/login"
                                    variant="outlined"
                                    fullWidth
                                >
                                    Back to Login
                                </Button>
                            </>
                        )}
                    </Stack>
                </Paper>
            </Box>
        </Container>
    );
}