export const equipmentKeys = {
    all: ["equipment"],

    lists: () => [...equipmentKeys.all, "list"],

    list: () => [...equipmentKeys.lists()],

    details: () => [...equipmentKeys.all, "detail"],

    detail: (id) => [...equipmentKeys.details(), id],
};