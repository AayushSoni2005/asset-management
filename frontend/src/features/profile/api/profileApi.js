import api from "@/api/axios";

const BASE_URL = "/users";

const profileApi = {
    getProfile() {
        return api.get(`${BASE_URL}/me`);
    },

    updateProfile(data) {
        return api.put(`${BASE_URL}/me`, data);
    },

    changePassword(data) {
        return api.put(`${BASE_URL}/me/password`, data);
    },
};

export default profileApi;