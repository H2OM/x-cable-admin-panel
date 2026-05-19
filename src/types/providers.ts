import type {User} from "./user.ts";

export default interface ProviderAuth {
    user: User | null;
    isAuthenticated: boolean;
    isPending: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
}