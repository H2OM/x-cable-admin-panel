import _FETCH from "@utils/_FETCH.ts";

const API_URL = `${import.meta.env.VITE_PUBLIC_API_URL}/admin-categories`;
const API_URL_PUBLIC = `${import.meta.env.VITE_PUBLIC_API_URL}/categories`;

export const getAll = async () => {
    return await _FETCH.request({url: `${API_URL_PUBLIC}/get-all`});
}

export const searchTypes = async (query: string) => {
    return await _FETCH.request({url: `${API_URL_PUBLIC}/search-types?query=${query}`});
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

export const deleteTypes = async (ids: number[]) => {
    return await _FETCH.progressTrackingRequest({
       url: `${API_URL}/delete-types`,
        options: {
            method: "POST",
            body: JSON.stringify({ids})
        }
    });
}
