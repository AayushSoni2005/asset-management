import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

import AppHeader from "./AppHeader";
import Sidebar from "./Sidebar";

export default function MainLayout() {
    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                overflow: "hidden",
            }}
        >
            <AppHeader />

            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    minWidth: 0,
                    p: 3,
                    bgcolor: "background.default",
                }}
            >
                <Toolbar />

                <Outlet />
            </Box>
        </Box>
    );
}