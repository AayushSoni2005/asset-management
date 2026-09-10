import { Box } from "@mui/material";

import AuthCard from "../components/AuthCard";
import AuthLogo from "../components/AuthLogo";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
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
                <RegisterForm />
            </AuthCard>
        </Box>
    );
}