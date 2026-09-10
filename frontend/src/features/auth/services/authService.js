import api from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";

const get = (url, config) =>
    api.get(url, config).then((response) => response.data);

const post = (url, data) =>
    api.post(url, data).then((response) => response.data);

const authService = {
    login(credentials) {
        return post(
            ENDPOINTS.AUTH.LOGIN,
            credentials
        );
    },

    register(data) {
        return post(
            ENDPOINTS.AUTH.REGISTER,
            data
        );
    },

    verifyEmail({ token, email }) {
        return get(
            ENDPOINTS.AUTH.VERIFY_EMAIL,
            {
                params: {
                    token,
                    email,
                },
            }
        );
    },

    resendVerificationEmail(email) {
        return post(
            ENDPOINTS.AUTH.RESEND_VERIFICATION,
            { email }
        );
    },

    forgotPassword(email) {
        return post(
            ENDPOINTS.AUTH.FORGOT_PASSWORD,
            { email }
        );
    },

    resetPassword(data) {
        return post(
            ENDPOINTS.AUTH.RESET_PASSWORD,
            data
        );
    },

    getCurrentUser() {
        return get(
            ENDPOINTS.USERS.ME
        );
    },
};

export default authService;