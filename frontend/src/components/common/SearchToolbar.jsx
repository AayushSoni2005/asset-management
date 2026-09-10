import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
    Button,
    IconButton,
    InputAdornment,
    MenuItem,
    Stack,
    TextField,
    Tooltip,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import RefreshIcon from "@mui/icons-material/Refresh";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchToolbar({
    search = "",
    onSearchChange,

    searchPlaceholder = "Search...",
    debounce = 500,

    status = "",
    onStatusChange,
    statusOptions = null,

    onReset,

    onRefresh,
    onExport,

    onAdd,
    addButtonText = "Add",

    loading = false,

    actions = null,
}) {
    const [value, setValue] = useState(search);

    useEffect(() => {
        setValue(search);
    }, [search]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (value !== search) {
                onSearchChange?.(value);
            }
        }, debounce);

        return () => clearTimeout(timer);
    }, [
        value,
        search,
        debounce,
        onSearchChange,
    ]);

    return (
        <Stack
            direction={{
                xs: "column",
                md: "row",
            }}
            spacing={2}
            justifyContent="space-between"
            alignItems={{
                xs: "stretch",
                md: "center",
            }}
        >
            <Stack
                direction={{
                    xs: "column",
                    sm: "row",
                }}
                spacing={2}
                flex={1}
            >
                <TextField
                    size="small"
                    placeholder={searchPlaceholder}
                    value={value}
                    onChange={(e) =>
                        setValue(e.target.value)
                    }
                    sx={{
                        width: {
                            xs: "100%",
                            md: 320,
                        },
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                {statusOptions && (
                    <TextField
                        select
                        size="small"
                        label="Status"
                        value={status}
                        disabled={loading}
                        onChange={(e) =>
                            onStatusChange?.(
                                e.target.value
                            )
                        }
                        sx={{
                            minWidth: 180,
                        }}
                    >
                        {statusOptions.map(
                            (option) => (
                                <MenuItem
                                    key={
                                        option.value
                                    }
                                    value={
                                        option.value
                                    }
                                >
                                    {
                                        option.label
                                    }
                                </MenuItem>
                            )
                        )}
                    </TextField>
                )}
            </Stack>

            <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
            >
                {actions}

                {onReset && (
                    <Button
                        variant="outlined"
                        startIcon={
                            <RestartAltIcon />
                        }
                        onClick={onReset}
                        disabled={loading}
                    >
                        Reset
                    </Button>
                )}

                {onRefresh && (
                    <Tooltip title="Refresh">
                        <span>
                            <IconButton
                                aria-label="Refresh"
                                onClick={
                                    onRefresh
                                }
                                disabled={
                                    loading
                                }
                            >
                                <RefreshIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                )}

                {onExport && (
                    <Tooltip title="Export">
                        <span>
                            <IconButton
                                aria-label="Export"
                                onClick={
                                    onExport
                                }
                                disabled={
                                    loading
                                }
                            >
                                <DownloadIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                )}

                {onAdd && (
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={onAdd}
                        disabled={loading}
                    >
                        {addButtonText}
                    </Button>
                )}
            </Stack>
        </Stack>
    );
}

SearchToolbar.propTypes = {
    search: PropTypes.string,
    onSearchChange: PropTypes.func,

    searchPlaceholder:
        PropTypes.string,

    debounce: PropTypes.number,

    status: PropTypes.string,
    onStatusChange: PropTypes.func,
    statusOptions: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string
                .isRequired,
            label: PropTypes.string
                .isRequired,
        })
    ),

    onReset: PropTypes.func,

    onRefresh: PropTypes.func,
    onExport: PropTypes.func,

    onAdd: PropTypes.func,
    addButtonText: PropTypes.string,

    loading: PropTypes.bool,

    actions: PropTypes.node,
};