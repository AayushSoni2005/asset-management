import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import authService from "../services/authService";
import useAuthStore from "../store/authStore";
import { setAccessToken } from "../../../utils/tokenStorage";

export default function useLogin() {
    const navigate = useNavigate();

    const setUser = useAuthStore((state) => state.setUser);
    const logout = useAuthStore((state) => state.logout);
    const setLoading = useAuthStore((state) => state.setLoading);

    return useMutation({
        mutationFn: authService.login,

        onMutate: () => {
            setLoading(true);
        },

        onSuccess: async (response) => {
            try {
                /**
                 * Expected backend response
                 *
                 * {
                 *   success: true,
                 *   data: {
                 *      accessToken: "..."
                 *   }
                 * }
                 */

                const accessToken = response.data.accessToken;

                setAccessToken(accessToken);

                const currentUserResponse =
                    await authService.getCurrentUser();

                setUser(currentUserResponse.data);

                toast.success("Login successful");

                navigate("/dashboard", {
                    replace: true,
                });
            } catch (error) {
                logout();

                toast.error("Unable to initialize your account.");
            }
        },

        onError: (error) => {
            const message =
                error.response?.data?.message ||
                "Invalid email or password.";

            toast.error(message);
        },

        onSettled: () => {
            setLoading(false);
        },
    });
}