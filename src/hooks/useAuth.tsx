import {useContext} from "react";
import type ProviderAuth from "@_types/providers.ts";
import AuthContext from "@providers/AuthProvider.tsx";

export default function useAuth() {
    const context = useContext<ProviderAuth | null>(AuthContext);

    if(!context) {
        throw new Error('Auth provider is missing');
    }

    return context;
}