import api from "@/api/axios";

const BASE_URL = "/equipment";

const equipmentService = {
    async getEquipments() {
        const { data } = await api.get(BASE_URL);
        return data;
    },

    async getEquipment(id) {
        const { data } = await api.get(`${BASE_URL}/${id}`);
        return data;
    },

    createEquipment(data) {
        return api.post(BASE_URL, data);
    },

    updateEquipment(id, data) {
        return api.put(`${BASE_URL}/${id}`, data);
    },

    deleteEquipment(id) {
        return api.delete(`${BASE_URL}/${id}`);
    },
};

export default equipmentService;