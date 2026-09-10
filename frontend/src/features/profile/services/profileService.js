import profileApi from "../api/profileApi";

export const profileService = {
    async getProfile() {
        const response = await profileApi.getProfile();
        return response.data;
    },

    async updateProfile(profileData) {
        const response = await profileApi.updateProfile(profileData);
        return response.data;
    },

    async changePassword(passwordData) {
        const response = await profileApi.changePassword(passwordData);
        return response.data;
    },
};