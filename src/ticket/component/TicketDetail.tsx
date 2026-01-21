import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale/es"
import { Calendar, Clock, User } from "lucide-react"
import { getTicketById, } from "../service/GetTicket"
import { Badge } from "@/components/ui/badge"
import type { Ticket, DefaultResponse } from "@/interfaces/DefaultResponse"


interface TicketDetailsProps {
  id: string;
}

export function TicketDetails({ id }: TicketDetailsProps) {
  

  const { data } = useQuery<DefaultResponse<Ticket>>({
    queryKey: ['ticket'],
    queryFn: () => getTicketById(id!),
    staleTime: 60 * 60 * 1000,
    enabled: !!id,
  })

  const ticket = data?.body;


  if (!ticket) {
    return <div>Ticket no encontrado</div>
  }

  const getStatusColor = (status: string) => {
  switch (status) {
    case "CREATE":
      return "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20"
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


  const getStatusLabel = (status: string) => {
  switch (status) {
    case "CREATE":
      return "Creado"
    case "OPEN":
      return "Abierto"
    case "IN_PROGRESS":
      return "En progreso"
    case "RESOLVED":
      return "Resuelto"
    case "CLOSED":
      return "Cerrado"
    default:
      return status
  }
}


 const createdAt = new Date(ticket.createdAt? ticket.createdAt.toString() : "");

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{ticket.title}</h1>
            <p className="text-sm text-muted-foreground">Ticket #{ticket.id}</p>
          </div>
          <Badge className={getStatusColor(ticket.status? ticket.status.toString() : "")}>
            {getStatusLabel(ticket.status? ticket.status.toString() : "")}
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Creado</p>
              <p className="font-medium">
                {formatDistanceToNow(createdAt, {
                  addSuffix: true,
                  locale: es,
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Creado por</p>
              <p className="font-medium">
                {ticket.createdBy?.firstName} {ticket.createdBy?.lastName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Asignado a</p>
              <p className="font-medium">
                {ticket.assignedTo?.firstName
                  ? `${ticket.assignedTo.firstName} ${ticket.assignedTo.lastName}`
                  : "Sin asignar"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Descripción</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap leading-relaxed">{ticket.description}</p>
        </CardContent>
      </Card>
    </div>
  )
}