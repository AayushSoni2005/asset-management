import api from "@/api/axios";

const BASE_URL = "/employees";
const USER_BASE_URL = "/admin/users";

const employeeService = {
    async getEmployees(params) {
        const { data } = await api.get(BASE_URL, {
            params,
        });

        return data;
    },

    async getEmployee(id) {
        const { data } = await api.get(`${BASE_URL}/${id}`);

        return data;
    },

    async getAvailableUsers() {
        const { data } = await api.get(
            `${USER_BASE_URL}/available`
        );

        return data;
    },

    async getTechnicians() {
        const { data } = await api.get(
            `${BASE_URL}/technicians`
        );

        return data;
    },

    async createEmployee(employee) {
        const { data } = await api.post(
            BASE_URL,
            employee
        );

        return data;
    },

    async updateEmployee(id, employee) {
        const { data } = await api.put(
            `${BASE_URL}/${id}`,
            employee
        );

        return data;
    },

    async deleteEmployee(id) {
        const { data } = await api.delete(
            `${BASE_URL}/${id}`
        );

        return data;
    },
};

export default employeeService;