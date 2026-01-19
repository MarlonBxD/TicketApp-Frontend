import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { Link } from "react-router-dom"
import type { Ticket } from "@/interfaces/DefaultResponse";

interface Props {
  tickets: Ticket[];
}

export function TicketsList({ tickets }: Props) {


  const role = "ADMIN";
  const ticketList = tickets || [];

  const getStatusColor = (statusName: string) => {
    switch (statusName) {
      case "OPEN":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      case "IN_PROGRESS":
        return "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20"
      case "RESOLVED":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "CLOSED":
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
      case "CREATE":
        return "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  const getStatusLabel = (statusName: string) => {
    switch (statusName) {
      case "OPEN":
        return "Abierto"
      case "IN_PROGRESS":
        return "En Progreso"
      case "RESOLVED":
        return "Resuelto"
      case "CLOSED":
        return "Cerrado"
      case "CREATE":
        return "Creado"
      default:
        return statusName
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tickets Recientes</CardTitle>
        <CardDescription>
          {role === "ADMIN"
            ? "Todos los tickets del sistema"
            : role === "SUPPORT"
              ? "Tickets asignados a ti"
              : "Tus tickets creados"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {ticketList.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No hay tickets para mostrar
          </p>
        ) : (
          <div className="space-y-4">
            {ticketList.map((ticket) => (
              <Link
                key={ticket.id}
                to={`/dashboard/tickets/${ticket.id}`}
                className="block p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{ticket.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {ticket.description}
                    </p>
                  </div>
                  <Badge className={getStatusColor(ticket.status)}>
                    {getStatusLabel(ticket.status)}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>ID: #{ticket.id.slice(0, 8)}</span>
                  <span>
                    Creado{" "}
                    {formatDistanceToNow(new Date(ticket.createdAt), {
                      addSuffix: true,
                      locale: es,
                    })}
                  </span>
                  {ticket.assignedTo && (
                    <span>
                      Asignado a: {ticket.assignedTo.firstName} {ticket.assignedTo.lastName}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}