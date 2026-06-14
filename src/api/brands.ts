import _FETCH from "@utils/_FETCH.ts";

const API_URL_PUBLIC = `${import.meta.env.VITE_PUBLIC_API_URL}/brands`;

export const search = async (query: string) => {
    return await _FETCH.request({url: `${API_URL_PUBLIC}/search?query=${query}`});
}