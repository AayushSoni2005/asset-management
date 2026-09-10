import { create } from "zustand";
import {
    getAccessToken,
    setAccessToken,
    clearAccessToken,
} from "../../../utils/tokenStorage";

const useAuthStore = create((set) => ({
    accessToken: getAccessToken(),

    user: null,
    isInitialized: false,

    isAuthenticated: !!getAccessToken(),

    isLoading: false,

    setLoading: (loading) =>
        set({
            isLoading: loading,
        }),

    setUser: (user) =>
        set({
            user,
            isAuthenticated: true,
        }),

    login: ({ accessToken, user }) => {
        setAccessToken(accessToken);

        set({
            accessToken,
            user,
            isAuthenticated: true,
        });
    },

    logout: () => {
        clearAccessToken();

        set({
            accessToken: null,
            user: null,
            isAuthenticated: false,
        });
    },

    setInitialized: (initialized) =>
    set({
        isInitialized: initialized,
    }),
}));

export default useAuthStore;