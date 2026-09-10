import api from "./axios";

export const get = (url, config) =>
    api.get(url, config).then((response) => response.data);

export const post = (url, data, config) =>
    api.post(url, data, config).then((response) => response.data);

export const put = (url, data, config) =>
    api.put(url, data, config).then((response) => response.data);

export const patch = (url, data, config) =>
    api.patch(url, data, config).then((response) => response.data);

export const del = (url, config) =>
    api.delete(url, config).then((response) => response.data);