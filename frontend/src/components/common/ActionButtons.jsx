import { IconButton, Stack, Tooltip } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export default function ActionButtons({
    row,
    onEdit,
    onDelete,
}) {
    return (
        <Stack direction="row" spacing={0.5}>
            {onEdit && (
                <Tooltip title="Edit">
                    <IconButton
                        aria-label="Edit"
                        size="small"
                        onClick={(event) => {
                            event.stopPropagation();
                            onEdit(row);
                        }}
                    >
                        <EditOutlinedIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            )}

            {onDelete && (
                <Tooltip title="Delete">
                    <IconButton
                        aria-label="Delete"
                        size="small"
                        color="error"
                        onClick={(event) => {
                            event.stopPropagation();
                            onDelete(row);
                        }}
                    >
                        <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            )}
        </Stack>
    );
}