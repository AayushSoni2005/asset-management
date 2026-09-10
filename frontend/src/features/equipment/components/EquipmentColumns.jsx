import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    IconButton,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";

import StatusChip from "../../../components/common/StatusChip";

export const getEquipmentColumns = ({
    onEdit,
    onDelete,
}) => {
    const columns = [
        {
            field: "assetTag",
            headerName: "Asset Tag",
            flex: 1,
            minWidth: 140,
        },
        {
            field: "name",
            headerName: "Equipment",
            flex: 1.3,
            minWidth: 180,
        },
        {
            field: "category",
            headerName: "Category",
            flex: 1,
            minWidth: 140,
        },
        {
            field: "brand",
            headerName: "Brand",
            flex: 1,
            minWidth: 140,
        },
        {
            field: "location",
            headerName: "Location",
            flex: 1,
            minWidth: 140,
            valueGetter: (_, row) =>
                row.location || "-",
        },
        {
            field: "status",
            headerName: "Status",
            width: 150,
            sortable: false,
            renderCell: ({ row }) => (
                <StatusChip value={row.status} />
            ),
        },
        {
            field: "assignedTo",
            headerName: "Assigned Employee",
            flex: 1.5,
            minWidth: 220,
            sortable: false,
            renderCell: ({ row }) => {
                if (!row.assignedTo) {
                    return (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            —
                        </Typography>
                    );
                }

                return (
                    <Stack spacing={0}>
                        <Typography variant="body2">
                            {row.assignedTo.firstName}{" "}
                            {row.assignedTo.lastName}
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            {row.assignedTo.employeeId}
                        </Typography>
                    </Stack>
                );
            },
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
                    spacing={1}
                >
                    {onEdit && (
                        <Tooltip title="Edit">
                            <IconButton
                                size="small"
                                onClick={() =>
                                    onEdit(row)
                                }
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}

                    {onDelete && (
                        <Tooltip title="Delete">
                            <IconButton
                                size="small"
                                color="error"
                                onClick={() =>
                                    onDelete(row)
                                }
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