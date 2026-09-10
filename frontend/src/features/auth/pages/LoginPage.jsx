import {
    Box,
} from "@mui/material";

import AuthCard from "../components/AuthCard";
import AuthLogo from "../components/AuthLogo";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
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

                <LoginForm />
            </AuthCard>
        </Box>
    );
}