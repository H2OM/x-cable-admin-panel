import type {Admins} from "./admins.ts";

export default interface ProviderAuth {
    user: Admins | null;
    isAuthenticated: boolean;
    isPending: boolean;
    login: (token: string, user: Admins) => void;
    logout: () => void;
}