import PropTypes from "prop-types";

import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

export default function FormDialog({
    open,
    title,
    children,
    onClose,
    cancelText = "Cancel",
    loading = false,
    maxWidth = "md",
    fullWidth = true,
    showCloseButton = true,
}) {
    const handleClose = (_, reason) => {
        if (loading) return;
        if (reason === "backdropClick") return;

        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={maxWidth}
            fullWidth={fullWidth}
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                {title}

                {showCloseButton && (
                    <IconButton
                        aria-label="Close dialog"
                        onClick={onClose}
                        disabled={loading}
                    >
                        <CloseIcon />
                    </IconButton>
                )}
            </DialogTitle>

            <DialogContent dividers>
                <Box sx={{ mt: 1 }}>
                    {children}
                </Box>
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={onClose}
                    disabled={loading}
                >
                    {cancelText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

FormDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
    cancelText: PropTypes.string,
    loading: PropTypes.bool,
    maxWidth: PropTypes.oneOf([
        "xs",
        "sm",
        "md",
        "lg",
        "xl",
    ]),
    fullWidth: PropTypes.bool,
    showCloseButton: PropTypes.bool,
};