import useAuth from "@hooks/useAuth.tsx";
import {Spin} from "antd";
import {Navigate, Outlet} from "react-router-dom";

export default function ProtectedRoute() {
    const { isAuthenticated, isPending } = useAuth();

    if (isPending) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" description={"Проверка авторизации..."} />
            </div>
        );
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}