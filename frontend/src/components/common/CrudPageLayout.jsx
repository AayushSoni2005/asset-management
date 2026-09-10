import PropTypes from "prop-types";
import { Paper, Stack, Box } from "@mui/material";

import DataTable from "./DataTable";
import PageHeader from "./PageHeader";
import SearchToolbar from "./SearchToolbar";

export default function CrudPageLayout({
    title,
    subtitle,
    headerAction,
    toolbarProps,
    tableProps,
    children,
}) {
    return (
        <Stack spacing={3}>
            <PageHeader
                title={title}
                subtitle={subtitle}
                action={headerAction}
            />

            <Paper elevation={1}>
                {toolbarProps && (
                    <Box p={2}>
                        <SearchToolbar {...toolbarProps} />
                    </Box>
                )}

                {tableProps && (
                    <DataTable {...tableProps} />
                )}
            </Paper>

            {children}
        </Stack>
    );
}

CrudPageLayout.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    headerAction: PropTypes.node,
    toolbarProps: PropTypes.object,
    tableProps: PropTypes.object,
    children: PropTypes.node,
};