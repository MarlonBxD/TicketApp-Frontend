import { DashboardHeader } from "@/dashboard/component/DashboardHeader"
import { StatsCards } from "@/dashboard/component/Stats-Cards"
import { TicketsList } from "@/dashboard/component/TicketList"
import { useAuthStore } from "@/auth/store/AuthStore";
import { useNavigate } from "react-router-dom";
import { useTickets } from "@/hooks/useTickets";

export const DashboardPage = () => {

  const { firstName, lastName, logout } = useAuthStore();
  const navigate = useNavigate();
  const {data} = useTickets();
  




  if(!firstName || !lastName){
    navigate('/auth/login');
    return;
  }

  const handleLogout = async () => {
    logout();
    navigate('/auth/login');
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader username={`${firstName} ${lastName}`} role="ADMIN" handleLogout={handleLogout} />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Bienvenido, {firstName} {lastName}</h1>
          <p className="text-muted-foreground">Panel de control del sistema de tickets</p>
        </div>
        <StatsCards  />
        <TicketsList tickets={data} />
      </main>
    </div>
  )
}
