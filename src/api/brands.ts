import _FETCH from "@utils/_FETCH.ts";

const API_URL_PUBLIC = `${import.meta.env.VITE_PUBLIC_API_URL}/brands`;
const API_URL = `${import.meta.env.VITE_PUBLIC_API_URL}/admin-brands`;

export const search = async (query: string) => {
    return await _FETCH.request({url: `${API_URL_PUBLIC}/search?query=${query}`});
}

export const getAll = async (page: number, limit: number) => {
    return await _FETCH.request({url: `${API_URL}/get-all?page=${page}&limit=${limit}`});
}

export const getCount = async () => {
    return await _FETCH.request({url: `${API_URL}/get-count`});
}

export const deleteMany = async (ids: number[], safe = false) => {
    return await _FETCH.progressTrackingRequest({
        url: `${API_URL}/${safe ? 'safe-delete' : 'delete'}`,
        options: {
            method: "POST",
            body: JSON.stringify({ids})
        }
    });
}