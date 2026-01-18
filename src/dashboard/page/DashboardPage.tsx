import { DashboardHeader } from "@/dashboard/component/DashboardHeader"
import { StatsCards } from "@/dashboard/component/Stats-Cards"
import { TicketsList } from "@/dashboard/component/TicketList"
import { useAuthStore } from "@/auth/store/AuthStore";
import { useNavigate } from "react-router-dom";
import { getTickets } from "@/ticket/service/GetTicket";
import { useQuery } from "@tanstack/react-query";

export const DashboardPage = () => {

  const { firstName, lastName, logout } = useAuthStore();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['tickets'],
    queryFn: () => getTickets({
      page: 0,
    }),
    enabled: !!(firstName && lastName),
  });
  console.log(data?.body.content);

  const tickets = data?.body.content || [];



  console.log(tickets);

  if (!firstName || !lastName) {
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
        <StatsCards />
        {isLoading && <div>Cargando tickets...</div>}
        {error && <div>Error al cargar tickets</div>}
        {data && <TicketsList tickets={data} />}
      </main>
    </div>
  )
}
