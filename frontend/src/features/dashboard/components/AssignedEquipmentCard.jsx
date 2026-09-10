import PropTypes from "prop-types";

import {
    Box,
    Chip,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import LaptopMacRoundedIcon from "@mui/icons-material/LaptopMacRounded";

const STATUS_COLORS = {
    AVAILABLE: "success",
    ASSIGNED: "primary",
    IN_REPAIR: "warning",
    RETIRED: "default",
};

export default function AssignedEquipmentCard({
    equipment,
}) {
    if (!equipment) {
        return (
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    borderRadius: 3,
                    border: "1px dashed",
                    borderColor: "divider",
                }}
            >
                <Stack
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                    minHeight={140}
                >
                    <LaptopMacRoundedIcon
                        color="disabled"
                        sx={{ fontSize: 40 }}
                    />

                    <Typography color="text.secondary">
                        No equipment assigned
                    </Typography>
                </Stack>
            </Paper>
        );
    }

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2.5,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                transition: "all .2s",

                "&:hover": {
                    borderColor: "primary.main",
                    boxShadow: 2,
                },
            }}
        >
            <Stack spacing={1.5}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        noWrap
                    >
                        {equipment.name}
                    </Typography>

                    <Chip
                        size="small"
                        label={equipment.status}
                        color={
                            STATUS_COLORS[
                                equipment.status
                            ] ?? "default"
                        }
                    />
                </Box>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    {equipment.assetTag}
                </Typography>

                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={0.5}
                >
                    <Box>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Category
                        </Typography>

                        <Typography
                            variant="body2"
                            fontWeight={500}
                        >
                            {equipment.category}
                        </Typography>
                    </Box>

                    <Box textAlign="right">
                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Assigned
                        </Typography>

                        <Typography
                            variant="body2"
                            fontWeight={500}
                        >
                            {equipment.assignedDate}
                        </Typography>
                    </Box>
                </Box>
            </Stack>
        </Paper>
    );
}

AssignedEquipmentCard.propTypes = {
    equipment: PropTypes.shape({
        name: PropTypes.string.isRequired,
        assetTag: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        assignedDate: PropTypes.string.isRequired,
    }),
};

AssignedEquipmentCard.defaultProps = {
    equipment: null,
};