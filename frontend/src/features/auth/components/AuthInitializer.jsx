import { useEffect } from "react";

import authService from "../services/authService";
import useAuthStore from "../store/authStore";
import {
    getAccessToken,
    clearAccessToken,
} from "../../../utils/tokenStorage";

export default function AuthInitializer({ children }) {
    const setUser = useAuthStore((state) => state.setUser);
    const logout = useAuthStore((state) => state.logout);
    const setInitialized = useAuthStore(
        (state) => state.setInitialized
    );

    useEffect(() => {
        const initialize = async () => {
            const token = getAccessToken();

            if (!token) {
                setInitialized(true);
                return;
            }

            try {
                const response =
                    await authService.getCurrentUser();

                setUser(response.data);
            } catch (error) {
                clearAccessToken();
                logout();
            } finally {
                setInitialized(true);
            }
        };

        initialize();
    }, [logout, setInitialized, setUser]);

    const isInitialized = useAuthStore(
        (state) => state.isInitialized
    );

    if (!isInitialized) {
        return null;
    }

    return children;
}