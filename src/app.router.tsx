import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "./auth/page/LoginPage";
import { AuthLayout } from "./auth/layout/AuthLoyout";
import { RegisterPage } from "./auth/page/RegisterPage";
import { DashboardLayout } from "./dashboard/layout/DashboardLayout";
import { DashboardPage } from "./dashboard/page/DashboardPage";
import { AdminDashboard } from "./admin/page/AdminDashboard";
import { AdminLayout } from "./admin/adminlayout/AdminLayout";
import { TicketLayout } from "./ticket/layout/TicketLayout";
import { TicketPageId } from "./ticket/page/TicketPage";
import { NewTicketPage } from "./ticket/page/NewTicket";

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
                element: <DashboardPage />
            }
        ],
    },
    {
        path: '/ticket',
        element: <TicketLayout />,
        children: [
            {
                path: ':id',
                element: <TicketPageId />
            },
            {
                path: 'new',
                element: <NewTicketPage/>
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <AdminDashboard />,
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to="/auth/login" />  
    }

]);