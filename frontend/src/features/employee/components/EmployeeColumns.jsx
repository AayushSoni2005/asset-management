import {
    IconButton,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import StatusChip from "../../../components/common/StatusChip";

/**
 * Returns DataGrid column definitions for Employee table.
 *
 * @param {Object} handlers
 * @param {Function} handlers.onEdit
 * @param {Function} handlers.onDelete
 */
export const getEmployeeColumns = ({
    onEdit,
    onDelete,
}) => {
    const columns = [
        {
            field: "employeeId",
            headerName: "Employee ID",
            flex: 1,
            minWidth: 140,
        },

        {
            field: "fullName",
            headerName: "Employee",
            flex: 1.8,
            minWidth: 250,
            renderCell: ({ row }) => (
                <Stack
                    justifyContent="center"
                    spacing={0.25}
        sx={{
            py: 1,
            overflow: "hidden",
        }}
                >
                    <Typography
                        variant="body2"
                        fontWeight={600}
                        noWrap
                    >
                        {row.fullName}
                    </Typography>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        noWrap
                    >
                        {row.email}
                    </Typography>

                </Stack>
            ),
        },
        {
    field: "role",
    headerName: "Role",
    width: 140,
    renderCell: ({ value }) => (
        <StatusChip value={value} />
    ),
},

        {
            field: "department",
            headerName: "Department",
            flex: 1,
            minWidth: 160,
        },

        {
            field: "designation",
            headerName: "Designation",
            flex: 1,
            minWidth: 160,
        },

        {
            field: "status",
            headerName: "Status",
            width: 130,
            renderCell: ({ value }) => (
                <StatusChip value={value} />
            ),
        },
    ];

    if (onEdit || onDelete) {
        columns.push({
            field: "actions",
            headerName: "Actions",
            width: 120,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,

            renderCell: ({ row }) => (
                <Stack
                    direction="row"
                    spacing={0.5}
                >
                    {onEdit && (
                        <Tooltip title="Edit Employee">
                            <IconButton
                                size="small"
                                color="primary"
                                onClick={() => onEdit(row)}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}

                    {onDelete && (
                        <Tooltip title="Delete Employee">
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
        });
    }

    return columns;
};