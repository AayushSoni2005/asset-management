// queryKeys.js
export const employeeKeys = {
    all: ["employees"],

    lists: () => [...employeeKeys.all, "list"],

    list: (filters) => [...employeeKeys.lists(), filters],

    details: () => [...employeeKeys.all, "detail"],

    detail: (id) => [...employeeKeys.details(), id],

    availableUsers: () => [
        ...employeeKeys.all,
        "available-users",
    ],

    technicians: () => [
        ...employeeKeys.all,
        "technicians",
    ],
};