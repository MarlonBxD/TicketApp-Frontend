import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DefaultResponse, PageResponse, Ticket } from "@/interfaces/DefaultResponse";
import { getTickets } from "@/ticket/service/GetTicket";
import { useQuery } from "@tanstack/react-query";
import { Ticket as TicketIcon, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Navigate } from "react-router-dom";


export function StatsCards() {

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user?.id;

  const data = useQuery<DefaultResponse<PageResponse<Ticket>>>({
    queryKey: ['tickets', userId],
    queryFn: () => getTickets({
      page: 0,
      sortBy: 'createdAt',
      sortDirection: 'DESC',
      createdById: userId,
    }),
    enabled: !!userId,
  });

  const tickets = data?.data?.body?.content;

  if (!userId) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Tickets</CardTitle>
          <TicketIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{tickets?.length || 0}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Creados</CardTitle>
          <AlertCircle className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{tickets?.filter((t) => t.status === 'CREATE').length || 0}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Abiertos</CardTitle>
          <CheckCircle className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{tickets?.filter((t) => t.status === 'OPEN').length || 0}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">En Proceso</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{tickets?.filter((t) => t.status === 'IN_PROGRESS').length || 0}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Resueltos</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{tickets?.filter((t) => t.status === 'RESOLVED').length || 0}</div>
        </CardContent>
      </Card>
    </div>
  );
}
