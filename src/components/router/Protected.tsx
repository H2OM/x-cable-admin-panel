import useAuth from "@hooks/useAuth.ts";
import {Outlet} from "react-router-dom";

export default function Protected({permission}: {permission: 'string'}) {
    const {user} = useAuth();
    const isRightPermission = user?.permissions.find(perm => {
        return perm.code === '*' || perm.code === permission;
    });

    return isRightPermission ? <Outlet /> : null;
}