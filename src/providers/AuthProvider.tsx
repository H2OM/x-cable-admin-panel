import {createContext, type ReactNode, useEffect, useState} from "react";
import type {User} from "@_types/user";
import {authAPI} from "@api";
import _FETCH from "@utils/_FETCH";
import type ProviderAuth from "@_types/providers.ts";

const AuthContext = createContext<ProviderAuth | null>(null);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isPending, setIsPending] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem("admin_token");

            if (!token) return setIsPending(false);

            _FETCH.setToken(token);

            const response = await authAPI.check();

            setIsPending(false);

            if (!response.success) {
                return logout();
            }

            setIsAuthenticated(true);
            setUser(response.data);
        })();
    }, []);

    const login = (token: string, userData: User) => {
        _FETCH.setToken(token);
        localStorage.setItem("admin_token", token);

        setUser(userData);
        setIsAuthenticated(true);
    }

    function logout() {
        localStorage.removeItem("admin_token");

        setUser(null);
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            isPending,
            login,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
