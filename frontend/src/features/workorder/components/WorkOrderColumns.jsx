import {
    IconButton,
    Stack,
    Tooltip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CancelIcon from "@mui/icons-material/Cancel";

import StatusChip from "../../../components/common/StatusChip";

export function getWorkOrderColumns({
    onEdit,
    onDelete,
    onAssign,
    onStart,
    onComplete,
    onCancel,
}) {
    const columns = [
        {
            field: "workOrderNumber",
            headerName: "Work Order",
            flex: 1,
        },
        {
            field: "issue",
            headerName: "Issue",
            flex: 1.5,
            valueGetter: (_, row) =>
                row.issue?.issueNumber,
        },
        {
            field: "technician",
            headerName: "Technician",
            flex: 1.5,
            valueGetter: (_, row) =>
                row.technician?.fullName,
        },
        {
            field: "title",
            headerName: "Title",
            flex: 2,
        },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
            renderCell: ({ value }) => (
                <StatusChip value={value} />
            ),
        },
        {
            field: "assignedAt",
            headerName: "Assigned",
            flex: 1.3,
        },
        {
            field: "completedAt",
            headerName: "Completed",
            flex: 1.3,
        },
    ];

    if (
        onEdit ||
        onDelete ||
        onAssign ||
        onStart ||
        onComplete ||
        onCancel
    ) {
        columns.push({
            field: "actions",
            headerName: "Actions",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            width: 250,

            renderCell: ({ row }) => (
                <Stack
                    direction="row"
                    spacing={1}
                >
                    {row.status ===
                        "PENDING" && (
                        <>
                            {onAssign && (
                                <Tooltip title="Assign">
                                    <IconButton
                                        color="primary"
                                        onClick={() =>
                                            onAssign(
                                                row
                                            )
                                        }
                                    >
                                        <AssignmentIndIcon />
                                    </IconButton>
                                </Tooltip>
                            )}

                            {onEdit && (
                                <Tooltip title="Edit">
                                    <IconButton
                                        color="primary"
                                        onClick={() =>
                                            onEdit(
                                                row
                                            )
                                        }
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                            )}

                            {onDelete && (
                                <Tooltip title="Delete">
                                    <IconButton
                                        color="error"
                                        onClick={() =>
                                            onDelete(
                                                row
                                            )
                                        }
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            )}

                            {onCancel && (
                                <Tooltip title="Cancel">
                                    <IconButton
                                        color="warning"
                                        onClick={() =>
                                            onCancel(
                                                row
                                            )
                                        }
                                    >
                                        <CancelIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </>
                    )}

                    {row.status ===
                        "ASSIGNED" && (
                        <>
                            {onStart && (
                                <Tooltip title="Start">
                                    <IconButton
                                        color="success"
                                        onClick={() =>
                                            onStart(
                                                row
                                            )
                                        }
                                    >
                                        <PlayArrowIcon />
                                    </IconButton>
                                </Tooltip>
                            )}

                            {onCancel && (
                                <Tooltip title="Cancel">
                                    <IconButton
                                        color="warning"
                                        onClick={() =>
                                            onCancel(
                                                row
                                            )
                                        }
                                    >
                                        <CancelIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </>
                    )}

                    {row.status ===
                        "IN_PROGRESS" &&
                        onComplete && (
                            <Tooltip title="Complete">
                                <IconButton
                                    color="success"
                                    onClick={() =>
                                        onComplete(
                                            row
                                        )
                                    }
                                >
                                    <AssignmentTurnedInIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                </Stack>
            ),
        });
    }

    return columns;
}