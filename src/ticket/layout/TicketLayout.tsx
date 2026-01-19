import { useAuthStore } from "@/auth/store/AuthStore";
import { Navigate, Outlet } from "react-router-dom"

export const TicketLayout = () => {

  const { user } = useAuthStore();

  const token = localStorage.getItem("token");

  if (!user || !token) {
    return <Navigate to="/auth/login" replace />;
  }
    return (
        <Outlet />
    )
}
