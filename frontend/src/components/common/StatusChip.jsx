import PropTypes from "prop-types";
import Chip from "@mui/material/Chip";

import { STATUS_CONFIG } from "../../constants/statusConfig";

export default function StatusChip({
    value,
    size = "small",
    variant = "filled",
}) {
    const config = STATUS_CONFIG[value];

    if (!config) {
        return (
            <Chip
                label={value ?? "Unknown"}
                size={size}
                variant={variant}
                color="default"
            />
        );
    }

    return (
        <Chip
            label={config.label}
            color={config.color}
            size={size}
            variant={variant}
        />
    );
}

StatusChip.propTypes = {
    value: PropTypes.string,
    size: PropTypes.oneOf(["small", "medium"]),
    variant: PropTypes.oneOf(["filled", "outlined"]),
};

StatusChip.defaultProps = {
    value: "",
    size: "small",
    variant: "filled",
};