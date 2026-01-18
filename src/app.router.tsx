import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "./auth/page/LoginPage";
import { AuthLayout } from "./auth/layout/AuthLoyout";
import { RegisterPage } from "./auth/page/RegisterPage";
import { DashboardLayout } from "./dashboard/layout/DashboardLayout";
import { DashboardPage } from "./dashboard/page/DashboardPage";

export const appRouter = createBrowserRouter([
    // auth routes
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
        {
            index: true,
            element: <Navigate to="/auth/login" />,
        },
        {
            path: 'login',
            element: <LoginPage />,
        },
        {
            path: 'register',
            element: <RegisterPage />,
        },
        ],
    },
    // dashboard routes
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <DashboardPage />,
            },
        ],
    },
    // fallback route
    {
        path: '*',
        element: <Navigate to="/auth/login" />,
    }
]);