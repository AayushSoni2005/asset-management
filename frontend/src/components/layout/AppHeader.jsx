import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    AppBar,
    Avatar,
    Box,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

import ConfirmDialog from "@/components/common/ConfirmDialog";
import useAuthStore from "@/features/auth/store/authStore";
import { DRAWER_WIDTH } from "./constants";

export default function AppHeader() {
    const navigate = useNavigate();

    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const [anchorEl, setAnchorEl] = useState(null);
    const [logoutDialogOpen, setLogoutDialogOpen] =
        useState(false);

    const menuOpen = Boolean(anchorEl);

    const initials =
        `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}` ||
        user?.email?.[0]?.toUpperCase() ||
        "?";

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const closeLogoutDialog = () => {
        setLogoutDialogOpen(false);
    };

    const handleProfile = () => {
        handleMenuClose();
        navigate("/profile");
    };

    const handleLogout = () => {
        handleMenuClose();
        setLogoutDialogOpen(true);
    };

    const handleConfirmLogout = () => {
        logout();
        closeLogoutDialog();
        navigate("/login", {
            replace: true,
        });
    };

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    width: `calc(100% - ${DRAWER_WIDTH}px)`,
                    ml: `${DRAWER_WIDTH}px`,
                    bgcolor: "primary.main",
                }}
            >
                <Toolbar>
                    <Typography
                        variant="h6"
                        sx={{ flexGrow: 1 }}
                    >
                        IT Asset Management
                    </Typography>

                    <Box sx={{ ml: 2 }}>
                        <IconButton
                            aria-label="Account menu"
                            size="small"
                            onClick={handleMenuOpen}
                        >
                            <Avatar>
                                {initials}
                            </Avatar>
                        </IconButton>

                        <Menu
                            id="account-menu"
                            anchorEl={anchorEl}
                            open={menuOpen}
                            onClose={handleMenuClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                        >
                            <MenuItem
                                onClick={handleProfile}
                            >
                                <ListItemIcon>
                                    <PersonOutlinedIcon fontSize="small" />
                                </ListItemIcon>

                                My Profile
                            </MenuItem>

                            <Divider />

                            <MenuItem
                                onClick={handleLogout}
                            >
                                <ListItemIcon>
                                    <LogoutIcon
                                        fontSize="small"
                                        color="error"
                                    />
                                </ListItemIcon>

                                <Typography color="error">
                                    Logout
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>

            <ConfirmDialog
                open={logoutDialogOpen}
                title="Logout"
                description="Are you sure you want to logout?"
                confirmText="Logout"
                confirmColor="error"
                onClose={closeLogoutDialog}
                onConfirm={handleConfirmLogout}
            />
        </>
    );
}