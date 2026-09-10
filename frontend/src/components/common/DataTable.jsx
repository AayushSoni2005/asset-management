import PropTypes from "prop-types";

import { Box } from "@mui/material";
import {
    DataGrid,
    GridOverlay,
} from "@mui/x-data-grid";

import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";
import LoadingState from "./LoadingState";
import { dataTableStyles } from "./dataTableStyles";

function CustomLoadingOverlay() {
    return (
        <GridOverlay>
            <Box width="100%" p={2}>
                <LoadingState variant="table" />
            </Box>
        </GridOverlay>
    );
}

function CustomNoRowsOverlay() {
    return (
        <GridOverlay>
            <EmptyState
                title="No records found"
                description="There are no records to display."
            />
        </GridOverlay>
    );
}

export default function DataTable({
    rows = [],
    columns = [],

    loading = false,
    error = null,

    paginationMode = "client",
    sortingMode = "client",

    paginationModel = {
        page: 0,
        pageSize: 10,
    },
    onPaginationModelChange,

    sortingModel = [],
    onSortModelChange,

    rowCount = 0,
    pageSizeOptions = [10, 20, 50],

    checkboxSelection = false,
    disableRowSelectionOnClick = true,

    autoHeight = true,

    getRowId = (row) => row.id,

    initialState,

    slots = {},
    slotProps = {},

    onRowClick,

    sx = {},
}) {
    if (error) {
        return (
            <ErrorState
                title="Unable to load data"
                message={
                    error?.message ??
                    "Something went wrong."
                }
            />
        );
    }

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            autoHeight={autoHeight}
            getRowId={getRowId}
            paginationMode={paginationMode}
            sortingMode={sortingMode}
            paginationModel={paginationModel}
            onPaginationModelChange={
                onPaginationModelChange
            }
            sortModel={sortingModel}
            onSortModelChange={
                onSortModelChange
            }
            rowCount={rowCount}
            pageSizeOptions={pageSizeOptions}
            initialState={initialState}
            checkboxSelection={checkboxSelection}
            disableRowSelectionOnClick={
                disableRowSelectionOnClick
            }
            onRowClick={onRowClick}
            slots={{
                loadingOverlay:
                    CustomLoadingOverlay,
                noRowsOverlay:
                    CustomNoRowsOverlay,
                ...slots,
            }}
            slotProps={slotProps}
            sx={{
                ...dataTableStyles,
                ...sx,
            }}
        />
    );
}

DataTable.propTypes = {
    rows: PropTypes.arrayOf(
        PropTypes.object
    ),

    columns: PropTypes.arrayOf(
        PropTypes.object
    ),

    loading: PropTypes.bool,

    error: PropTypes.object,

    paginationMode: PropTypes.oneOf([
        "client",
        "server",
    ]),

    sortingMode: PropTypes.oneOf([
        "client",
        "server",
    ]),

    paginationModel: PropTypes.shape({
        page: PropTypes.number,
        pageSize: PropTypes.number,
    }),

    onPaginationModelChange:
        PropTypes.func,

    sortingModel: PropTypes.array,

    onSortModelChange:
        PropTypes.func,

    rowCount: PropTypes.number,

    pageSizeOptions:
        PropTypes.arrayOf(
            PropTypes.number
        ),

    checkboxSelection:
        PropTypes.bool,

    disableRowSelectionOnClick:
        PropTypes.bool,

    autoHeight:
        PropTypes.bool,

    getRowId:
        PropTypes.func,

    initialState:
        PropTypes.object,

    slots:
        PropTypes.object,

    slotProps:
        PropTypes.object,

    onRowClick:
        PropTypes.func,

    sx:
        PropTypes.object,
};