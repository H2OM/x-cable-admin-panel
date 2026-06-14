import _FETCH from "@utils/_FETCH.ts";
import formatQueryParams from "@utils/formatQueryParams.ts";

const API_URL_PUBLIC = `${import.meta.env.VITE_PUBLIC_API_URL}/orders`;
const API_URL = `${import.meta.env.VITE_PUBLIC_API_URL}/admin-orders`;

export const get = async (id: number) => {
    return await _FETCH.request({url: `${API_URL_PUBLIC}/get?id=${id}`});
}

export const getAll = async (page: number, limit: number) => {
    return await _FETCH.request({url: `${API_URL}/get-all?page=${page}&limit=${limit}`});
}

export const getCount = async (userId?: number) => {
    const params = formatQueryParams({
        user_id: userId
    });

    return await _FETCH.request({url: `${API_URL}/get-count${params ? `?${params}` : ''}`})
}

export const updateStatus = async (ids: number[], status: string) => {
    return await _FETCH.progressTrackingRequest({
        url: `${API_URL}/update-status`,
        options: {
            method: "POST",
            body: JSON.stringify({ids, status})
        }
    });
}

export const deleteMany = async (ids: number[]) => {
    return await _FETCH.progressTrackingRequest({
        url: `${API_URL}/delete`,
        options: {
            method: "POST",
            body: JSON.stringify({ids})
        }
    });
}