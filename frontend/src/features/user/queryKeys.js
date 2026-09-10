export const USER_QUERY_KEYS = {
    all: ["users"],

    lists: () => [...USER_QUERY_KEYS.all, "list"],

    list: (filters = {}) => [
        ...USER_QUERY_KEYS.lists(),
        filters,
    ],

    details: () => [...USER_QUERY_KEYS.all, "detail"],

    detail: (id) => [
        ...USER_QUERY_KEYS.details(),
        id,
    ],
};