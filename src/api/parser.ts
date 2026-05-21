import _FETCH from "../utils/_FETCH.ts";
import type {AnlanParser} from "@/types/parsers.ts";

const API_URL = `${import.meta.env.VITE_PUBLIC_API_URL}/admin-parser`;

export const fromAnlan = async (data: AnlanParser) => {
    return await _FETCH.request({url: `${API_URL}/from-anlan`, toastSuccess: true, options: {
        method: "POST",
        body: JSON.stringify(data)
    }});
}