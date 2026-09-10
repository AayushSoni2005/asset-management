import {
    createUserApi,
    deleteUserApi,
    getUserByIdApi,
    getUsersApi,
    updateUserApi,
} from "../api/userManagementApi";

export const getUsers = () => getUsersApi();

export const getUserById = (id) =>
    getUserByIdApi(id);

export const createUser = (payload) =>
    createUserApi(payload);

export const updateUser = (id, data) =>
    updateUserApi(id, data);

export const deleteUser = (id) =>
    deleteUserApi(id);