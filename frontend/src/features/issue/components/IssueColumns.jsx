import {
    Delete,
    Edit,
} from "@mui/icons-material";
import {
    IconButton,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";

import StatusChip from "@/components/common/StatusChip";

export const getIssueColumns = ({
    onEdit,
    onDelete,
}) => {
    const columns = [
        {
            field: "issueNumber",
            headerName: "Issue #",
            flex: 1,
            minWidth: 160,
        },

        {
            field: "title",
            headerName: "Title",
            flex: 1.5,
            minWidth: 220,
        },

        {
            field: "equipment",
            headerName: "Equipment",
            flex: 1.5,
            minWidth: 220,
            renderCell: ({ row }) =>
                row.equipment ? (
                    <Stack spacing={0.25}>
                        <Typography variant="body2">
                            {row.equipment.name}
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            {row.equipment.assetTag}
                        </Typography>
                    </Stack>
                ) : (
                    "-"
                ),
        },

        {
            field: "reportedBy",
            headerName: "Reported By",
            flex: 1.5,
            minWidth: 220,
            renderCell: ({ row }) =>
                row.reportedBy ? (
                    <Stack spacing={0.25}>
                        <Typography variant="body2">
                            {row.reportedBy.firstName}{" "}
                            {row.reportedBy.lastName}
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            {row.reportedBy.employeeId}
                        </Typography>
                    </Stack>
                ) : (
                    "-"
                ),
        },

        {
            field: "assignedTo",
            headerName: "Assigned To",
            flex: 1.5,
            minWidth: 220,
            renderCell: ({ row }) =>
                row.assignedTo ? (
                    <Stack spacing={0.25}>
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
                ) : (
                    "-"
                ),
        },

        {
            field: "priority",
            headerName: "Priority",
            width: 130,
            sortable: false,
            renderCell: ({ value }) => (
                <StatusChip value={value} />
            ),
        },

        {
            field: "status",
            headerName: "Status",
            width: 150,
            sortable: false,
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
                <Stack direction="row">
                    {onEdit && (
                        <Tooltip title="Edit">
                            <IconButton
                                size="small"
                                onClick={() =>
                                    onEdit(row)
                                }
                            >
                                <Edit fontSize="small" />
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
                                <Delete fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                </Stack>
            ),
        });
    }

    return columns;
};