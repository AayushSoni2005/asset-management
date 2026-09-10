import {
    Avatar,
    Box,
    Divider,
    Drawer,
    List,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";

import { APP } from "@/constants/app";
import useAuthStore from "@/features/auth/store/authStore";

import NavItem from "./NavItem";
import { DRAWER_WIDTH } from "./constants";
import { navigation } from "./navigation";

const dividerSx = {
    borderColor: "rgba(255,255,255,0.12)",
};

export default function Sidebar() {
    const user = useAuthStore((state) => state.user);

    const visibleNavigation = navigation.filter(
        ({ roles }) =>
            !roles || roles.includes(user?.role)
    );

    const initials =
        `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}` ||
        user?.email?.[0]?.toUpperCase() ||
        "?";

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: DRAWER_WIDTH,
                flexShrink: 0,

                "& .MuiDrawer-paper": {
                    width: DRAWER_WIDTH,
                    boxSizing: "border-box",
                    display: "flex",
                    bgcolor: "grey.900",
                    color: "white",
                },
            }}
        >
            <Toolbar />

            <Box px={3} py={3} sx={{ minHeight: "64px !important" }}>
                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                >
                    <Avatar
                        sx={{
                            width: 48,
                            height: 48,
                            bgcolor: "primary.main",
                        }}
                    >
                        <DevicesRoundedIcon />
                    </Avatar>

                    <Typography variant="h6" fontWeight={700}>
    {APP.NAME}
</Typography>
                </Stack>
            </Box>

            <Divider sx={dividerSx} />

            <List
                sx={{
                    flexGrow: 1,
                    pt: 2,
                }}
            >
                {visibleNavigation.map((item) => (
                    <NavItem
                        key={item.path}
                        {...item}
                    />
                ))}
            </List>

            <Divider sx={dividerSx} />

            <Box p={2} sx={{ minHeight: "64px !important" }}>
                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                >
                    <Avatar
                        sx={{
                            bgcolor: "primary.main",
                            minHeight: "32px ",
                        }}
                    >
                        {initials}
                    </Avatar>

                    <Box>
                        <Typography
                            variant="body2"
                            fontWeight={600}
                            sx={{ minHeight: "14px !important" }}
                        >
                            {user?.firstName}{" "}
                            {user?.lastName}
                        </Typography>

                        <Typography
                            variant="caption"
                            color="grey.400"
                        >
                            {user?.role}
                        </Typography>
                    </Box>
                </Stack>
            </Box>
        </Drawer>
    );
}