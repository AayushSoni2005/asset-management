import api from "@/api/axios";

const BASE_URL = "/issues";

const issueService = {
    getIssues: async () => {
        const response = await api.get(BASE_URL);
        return response.data;
    },

    getIssueById: async (id) => {
        const response = await api.get(`${BASE_URL}/${id}`);
        return response.data;
    },

    createIssue: async (issue) => {
        const response = await api.post(BASE_URL, issue);
        return response.data;
    },

    updateIssue: async (id, issue) => {
        const response = await api.put(`${BASE_URL}/${id}`, issue);
        return response.data;
    },

    deleteIssue: async (id) => {
        const response = await api.delete(`${BASE_URL}/${id}`);
        return response.data;
    },
};

export default issueService;