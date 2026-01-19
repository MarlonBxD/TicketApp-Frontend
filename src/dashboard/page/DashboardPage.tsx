import { DashboardHeader } from "@/dashboard/component/DashboardHeader"
import { StatsCards } from "@/dashboard/component/Stats-Cards"
import { TicketsList } from "@/dashboard/component/TicketList"
import { useAuthStore } from "@/auth/store/AuthStore";
import { useNavigate } from "react-router-dom";
import { getTickets } from "@/ticket/service/GetTicket";
import { useQuery } from "@tanstack/react-query";
import type { DefaultResponse, PageResponse, Ticket } from "@/interfaces/DefaultResponse";

export const DashboardPage = () => {

  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery<DefaultResponse<PageResponse<Ticket>>>({
    queryKey: ['tickets'],
    queryFn: () => getTickets({
      page: 0,
      sortBy: 'createdAt',
      sortDirection: 'DESC',
      createdBy: user?.id,
    }),
    enabled: !!user,
  });

  if (!user) {
    navigate('/auth/login');
    return;
  }

  const token = localStorage.getItem('token');

  if (!token) {
    navigate('/auth/login');
    return;
  }

  const role = user.roles[0].name;

  const handleLogout = async () => {
    logout();
    navigate('/auth/login');
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader username={user?.firstName + ' ' + user?.lastName} role={role} handleLogout={handleLogout} />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Bienvenido, {user?.firstName + ' ' + user?.lastName}</h1>
          <p className="text-muted-foreground">Panel de control del sistema de tickets</p>
        </div>
        <StatsCards />
        {isLoading && <div>Cargando tickets...</div>}
        {error && <div>Error al cargar tickets</div>}
        {data && <TicketsList />}
      </main>
    </div>
  )
}
