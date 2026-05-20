export interface User {
    id: number;
    name: string;
    email: string;
    login: string;
    last_login: string;
    role: string;
    role_code: string;
    permissions: UserPermissions[];
}

export interface UserPermissions {
    id: number;
    name: string;
    code: string;
}