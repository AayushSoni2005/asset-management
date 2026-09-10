export const issueKeys = {
    all: ["issues"],

    lists: () => [...issueKeys.all, "list"],

    list: () => [...issueKeys.lists()],

    details: () => [...issueKeys.all, "detail"],

    detail: (id) => [...issueKeys.details(), id],
};