import './styles/global.scss';
import {ConfigProvider} from "antd";
import ruRU from 'antd/locale/ru_RU';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import ProtectedRoute from "@components/router/ProtectedRoute.tsx";
import Login from "@pages/Login.tsx";
import Main from "@pages/Main.tsx";
import {AuthProvider} from "@providers/AuthProvider.tsx";

export default function App() {
    return (
        <ConfigProvider locale={ruRU}>
            <AuthProvider>
                <BrowserRouter>
                    {/* Публичные маршруты */}
                    <Routes>
                        <Route path="/login" element={<Login/>}/>

                        {/* Защищенные маршруты (доступны только после авторизации) */}
                        <Route element={<ProtectedRoute/>}>
                            <Route path={"/"} element={<Main/>}/>
                        </Route>

                        {/* Редирект по умолчанию TODO на 404 */}
                        <Route path="*" element={<Navigate to="/" replace/>}/>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </ConfigProvider>
    );
}