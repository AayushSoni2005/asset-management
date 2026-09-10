import PropTypes from "prop-types";

import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Typography,
} from "@mui/material";

import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

export default function ConfirmDialog({
    open,
    title,
    description,

    confirmText = "Confirm",
    cancelText = "Cancel",
    confirmColor = "primary",

    loading = false,

    onConfirm,
    onClose,

    children = null,
}) {
    return (
        <Dialog
            open={open}
            onClose={loading ? undefined : onClose}
            maxWidth="xs"
            fullWidth
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-description"
        >
            <DialogTitle id="confirm-dialog-title">
                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                >
                    <WarningAmberRoundedIcon color="warning" />

                    <Typography variant="h6">
                        {title}
                    </Typography>
                </Stack>
            </DialogTitle>

            <DialogContent>
                {description && (
                    <Typography
                        id="confirm-dialog-description"
                        variant="body2"
                        color="text.secondary"
                        mb={2}
                    >
                        {description}
                    </Typography>
                )}

                {children}
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={onClose}
                    disabled={loading}
                >
                    {cancelText}
                </Button>

                <Button
                    variant="contained"
                    color={confirmColor}
                    onClick={onConfirm}
                    disabled={loading}
                    startIcon={
                        loading ? (
                            <CircularProgress
                                size={18}
                                color="inherit"
                            />
                        ) : null
                    }
                >
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

ConfirmDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    confirmColor: PropTypes.oneOf([
        "primary",
        "secondary",
        "success",
        "error",
        "warning",
        "info",
    ]),
    loading: PropTypes.bool,
    onConfirm: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
};