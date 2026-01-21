import { useAuthStore } from "@/auth/store/AuthStore";
import { AdminStats } from "../component/AdminStats";
import { UsersTable } from "../component/UserTable";
import { AllTicketsTable } from "../component/AllTicketTable";
import { DashboardHeader } from "@/dashboard/component/DashboardHeader";
import type { DefaultResponse, PageResponse, Ticket } from "@/interfaces/DefaultResponse";
import { useQuery } from "@tanstack/react-query";
import { getTickets } from "@/ticket/service/GetTicket";
import { getAllUsers } from "@/user/service/UserService";

export const AdminDashboard = () => {

    const { user } = useAuthStore();

    const data = useQuery<DefaultResponse<PageResponse<Ticket>>>({
    queryKey: ['tickets'],
    queryFn: () => getTickets({
      page: 0,
      sortBy: 'createdAt',
      sortDirection: 'DESC',
    }),
  })


  const { data: usersData } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers({
      page: 0,
      sortBy: "createdAt", 
      sortDirection: "DESC"}),
    
  })

  if (!usersData) {
    return <div>Cargando usuarios...</div>
  }

  const users = usersData.body.content

  const ticketList = data?.data?.body?.content || [];
    

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader username={`${user?.firstName} ${user?.lastName}`} role={user?.roles[0].name} />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Panel de Administración</h1>
          <p className="text-muted-foreground">Gestión completa del sistema de tickets</p>
        </div>
        <AdminStats users={users} tickets={ticketList}/>
        <div className="grid gap-8 lg:grid-cols-2 mt-8">
          <UsersTable users={users}/>
          <AllTicketsTable tickets={ticketList}/>
        </div>
      </main>
    </div>
  )
}
