import _FETCH from "@utils/_FETCH.ts";

// const API_URL = `${import.meta.env.VITE_PUBLIC_API_URL}/admin-categories`;
const API_URL_PUBLIC = `${import.meta.env.VITE_PUBLIC_API_URL}/categories`;

export const getAll = async () => {
    return await _FETCH.request({url: `${API_URL_PUBLIC}/get-all`});
}
