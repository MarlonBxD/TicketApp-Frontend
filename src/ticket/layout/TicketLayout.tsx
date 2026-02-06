import { useAuthStore } from "@/auth/store/AuthStore";
import { DashboardHeader } from "@/dashboard/component/DashboardHeader";
import { Navigate, Outlet, useNavigate } from "react-router-dom"

export const TicketLayout = () => {

  const navigate = useNavigate();
  const { user } = useAuthStore();
  const role = user?.roles[0].name;
  
  const handleLogout = () => {
    navigate("/auth/login");
  };

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  const token = localStorage.getItem("token");

  if (!user || !token) {
    return <Navigate to="/auth/login" replace />;
  }
  return (
    <>
      <DashboardHeader username={user?.firstName + ' ' + user?.lastName} role={role} handleLogout={handleLogout} />
      <Outlet />
    </>
  )
}
