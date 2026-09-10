import { ENDPOINTS } from "@/api/endpoints";
import { del, get, post, put } from "@/api/request";

export const getUsersApi = () =>
    get(ENDPOINTS.USER_MANAGEMENT.BASE);

export const getUserByIdApi = (id) =>
    get(ENDPOINTS.USER_MANAGEMENT.BY_ID(id));

export const createUserApi = (payload) =>
    post(
        ENDPOINTS.USER_MANAGEMENT.BASE,
        payload
    );

export const updateUserApi = (
    id,
    payload
) =>
    put(
        ENDPOINTS.USER_MANAGEMENT.BY_ID(id),
        payload
    );

export const deleteUserApi = (id) =>
    del(
        ENDPOINTS.USER_MANAGEMENT.BY_ID(id)
    );