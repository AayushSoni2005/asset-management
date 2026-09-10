import {
    Chip,
    IconButton,
    Stack,
    Tooltip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ROLE_COLORS = {
    ADMIN: "error",
    EMPLOYEE: "primary",
    TECHNICIAN: "warning",
};

export const getUserColumns = ({
    onEdit,
    onDelete,
}) => [
    {
        field: "id",
        headerName: "ID",
        width: 90,
        align: "center",
        headerAlign: "center",
    },
    {
        field: "email",
        headerName: "Email",
        flex: 1,
        minWidth: 260,
    },
    {
        field: "role",
        headerName: "Role",
        width: 150,
        align: "center",
        headerAlign: "center",
        renderCell: ({ value }) => (
            <Chip
                label={value}
                color={ROLE_COLORS[value] ?? "default"}
                size="small"
            />
        ),
    },
    {
        field: "enabled",
        headerName: "Status",
        width: 140,
        align: "center",
        headerAlign: "center",
        renderCell: ({ value }) => (
            <Chip
                label={value ? "Enabled" : "Disabled"}
                color={value ? "success" : "default"}
                size="small"
            />
        ),
    },
    {
        field: "actions",
        headerName: "Actions",
        width: 120,
        sortable: false,
        filterable: false,
        align: "center",
        headerAlign: "center",
        renderCell: ({ row }) => (
            <Stack
                direction="row"
                spacing={0.5}
                justifyContent="center"
            >
                {onEdit && (
                    <Tooltip title="Edit User">
                        <IconButton
                            size="small"
                            onClick={() => onEdit(row)}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                )}

                {onDelete && (
                    <Tooltip title="Delete User">
                        <IconButton
                            size="small"
                            color="error"
                            onClick={() => onDelete(row)}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                )}
            </Stack>
        ),
    },
];