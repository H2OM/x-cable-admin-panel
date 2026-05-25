import _FETCH from "@utils/_FETCH.ts";

const API_URL_PUBLIC = `${import.meta.env.VITE_PUBLIC_API_URL}/products`;
const API_URL = `${import.meta.env.VITE_PUBLIC_API_URL}/admin-products`;

export const searchIds = async (query: string) => {
    return await _FETCH.request({url: `${API_URL_PUBLIC}/search-ids?query=${query}`});
}

export const oneWayPairVariation = async (data: {
    id: number;
    variation_id: number;
}) => {
    return await _FETCH.progressTrackingRequest({
        url: `${API_URL}/pair-variation`,
        options: {
            method: "POST",
            body: JSON.stringify({...data, one_way: true})
        }
    });
}

export const pairVariation = async (data: {
    id: number;
    variation_id: number;
}) => {
    return await _FETCH.progressTrackingRequest({
        url: `${API_URL}/pair-variation`,
        options: {
            method: "POST",
            body: JSON.stringify(data)
        }
    });
}

