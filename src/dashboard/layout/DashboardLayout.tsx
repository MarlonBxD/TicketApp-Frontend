import { useAuthStore } from "@/auth/store/AuthStore";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { DashboardHeader } from "../component/DashboardHeader";

export const DashboardLayout = () => {

  const navigate = useNavigate();
  const { user } = useAuthStore();
  const role = user?.roles[0].name;

  
  const handleLogout = () => {
    navigate("/auth/login");
  };

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <>
    <div className="min-h-screen bg-background">
      <DashboardHeader username={user?.firstName + ' ' + user?.lastName} role={role} handleLogout={handleLogout} />
      <Outlet />
    </div>
    </>
  );
};
