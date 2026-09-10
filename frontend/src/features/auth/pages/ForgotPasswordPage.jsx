import { Box } from "@mui/material";

import AuthCard from "../components/AuthCard";
import AuthLogo from "../components/AuthLogo";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "background.default",
                p: 2,
            }}
        >
            <AuthCard>
                <AuthLogo />
                <ForgotPasswordForm />
            </AuthCard>
        </Box>
    );
}