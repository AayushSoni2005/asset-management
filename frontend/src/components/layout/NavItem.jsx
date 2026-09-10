import PropTypes from "prop-types";
import {
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";

export default function NavItem({
    icon: Icon,
    label,
    path,
}) {
    return (
        <ListItemButton
            component={NavLink}
            to={path}
            end
            aria-label={label}
            sx={{
                minHeight: 48,
                mx: 1.5,
                mb: 0.75,
                px: 2,
                borderRadius: 3,
                color: "grey.300",
                transition:
                    "background-color 0.2s ease, color 0.2s ease",

                "& .MuiListItemIcon-root": {
                    minWidth: 40,
                    color: "grey.400",
                },

                "&:hover": {
                    bgcolor: "rgba(255,255,255,0.08)",

                    "& .MuiListItemIcon-root": {
                        color: "white",
                    },
                },

                "&.active": {
                    bgcolor: "primary.main",
                    color: "white",

                    "& .MuiListItemIcon-root": {
                        color: "white",
                    },
                },
            }}
        >
            <ListItemIcon>
                <Icon fontSize="small" />
            </ListItemIcon>

            <ListItemText
                primary={label}
                primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: 500,
                }}
            />
        </ListItemButton>
    );
}

NavItem.propTypes = {
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
};