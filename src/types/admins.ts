export interface Admins {
    id: number;
    name: string;
    email: string;
    login: string;
    last_login: string;
    role: string;
    role_code: string;
    permissions: AdminPermissions[];
}

export interface AdminPermissions {
    id: number;
    name: string;
    code: string;
}