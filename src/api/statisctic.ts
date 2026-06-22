import _FETCH from "@utils/_FETCH.ts";
import formatQueryParams from "@utils/formatQueryParams.ts";

const API_URL = `${import.meta.env.VITE_PUBLIC_API_URL}/admin-statistic`;

export const get = async (from: string, to: string) => {
    const params = formatQueryParams({
        from,
        to
    });

    return await _FETCH.request({url: `${API_URL}/get${params ? `?${params}` : ''}`});
}