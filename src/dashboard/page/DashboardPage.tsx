import { DashboardHeader } from "@/components/custom/DashboardHeader"
import { StatsCards } from "@/components/custom/Stats-Cards"
import { TicketsList } from "@/components/custom/TicketList"
import { useAuthStore } from "@/auth/store/AuthStore";
import { useNavigate } from "react-router-dom";

export const DashboardPage = () => {

  const { firstName, lastName } = useAuthStore();
  const navigate = useNavigate();

  if(!firstName || !lastName){
    navigate('/auth/login');
    return;
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader username={`${firstName} ${lastName}`} role="admin" />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Bienvenido, {firstName} {lastName}</h1>
          <p className="text-muted-foreground">Panel de control del sistema de tickets</p>
        </div>
        <StatsCards  />
        <TicketsList  />
      </main>
    </div>
  )
}
