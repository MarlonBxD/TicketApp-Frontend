
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { Link } from "lucide-react"
import type { DefaultResponse} from "@/interfaces/DefaultResponse";

interface Props{
  tickets?: DefaultResponse | undefined;
}


export async function TicketsList({tickets}: Props) {

    const role = "ADMIN" // TODO: Fetch user role from session or database
  

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
        {tickets?.body.content.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No hay tickets para mostrar</p>
        ) : (
          <div className="space-y-4">
            {tickets?.body.content.map((ticket: any) => (
              <Link
                key={ticket.id}
                href={`/tickets/${ticket.id}`}
                className="block p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{ticket.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{ticket.description}</p>
                  </div>
                  <Badge className={getStatusColor(ticket.ticket_status.name)}>
                    {getStatusLabel(ticket.ticket_status.name)}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>ID: #{ticket.id}</span>
                  <span>{ticket.ticket_category.name}</span>
                  <span>
                    Creado{" "}
                    {formatDistanceToNow(new Date(ticket.created_at), {
                      addSuffix: true,
                      locale: es,
                    })}
                  </span>
                  {ticket.assignee && <span>Asignado a: {ticket.assignee.full_name}</span>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
