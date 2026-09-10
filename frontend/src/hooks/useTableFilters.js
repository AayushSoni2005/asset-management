import { useMemo, useState, useCallback } from "react";

export default function useTableFilters(
    rows = [],
    {
        searchFields = [],
        statusField = "status",
    } = {}
) {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    const filteredRows = useMemo(() => {
        return rows.filter((row) => {
            const matchesSearch =
                !search ||
                searchFields.some((field) => {
                    const value = row[field];

                    return String(value ?? "")
                        .toLowerCase()
                        .includes(search.toLowerCase());
                });

            const matchesStatus =
                !status ||
                row[statusField] === status;

            return matchesSearch && matchesStatus;
        });
    }, [
        rows,
        search,
        status,
        searchFields,
        statusField,
    ]);

    const resetFilters = useCallback(() => {
        setSearch("");
        setStatus("");
    }, []);

    return {
        search,
        setSearch,

        status,
        setStatus,

        filteredRows,

        resetFilters,
    };
}