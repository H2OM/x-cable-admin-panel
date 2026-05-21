import _FETCH from "../utils/_FETCH.ts";

const API_URL = `${import.meta.env.VITE_PUBLIC_API_URL}/categories`;

export const getAll = async () => {
    return await _FETCH.request({url: `${API_URL}/get-all`});
}
