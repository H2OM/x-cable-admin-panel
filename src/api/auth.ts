import _FETCH from "../utils/_FETCH.ts";

const API_URL = `${import.meta.env.VITE_PUBLIC_API_URL}/admin-auth`;

export const check = async () => {
    return await _FETCH.request({url: `${API_URL}/check`});
}

export const login = async (login: string, password: string) => {
    return await _FETCH.request({url: `${API_URL}/login`, options: {
        method: "POST",
        body: JSON.stringify({login, password})
    }});
}