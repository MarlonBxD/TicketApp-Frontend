
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import type { Ticket } from "@/interfaces/DefaultResponse"

interface Props{
  tickets: Ticket[]
}

export const AllTicketsTable = ({ tickets }: Props) => {

 

  const getStatusColor = (statusName: string) => {
    switch (statusName) {
      case "OPEN":
        return "bg-blue-500/10 text-blue-500"
      case "IN_PROGRESS":
        return "bg-orange-500/10 text-orange-500"
      case "RESOLVED":
        return "bg-green-500/10 text-green-500"
      case "CLOSED":
        return "bg-gray-500/10 text-gray-500"
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
        <CardTitle>Todos los Tickets</CardTitle>
        <CardDescription>Vista general de tickets recientes</CardDescription>
      </CardHeader>
      <CardContent>
        {!tickets || tickets.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No hay tickets creados</p>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <Link
                key={ticket.id}
                to={`/ticket/${ticket.id}`}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
              >
                <div className="flex-1">
                  <p className="font-semibold">{ticket?.title || ""}</p>
                  <p className="text-sm text-muted-foreground">
                    Por {ticket?.createdBy?.firstName || "" } {ticket?.createdBy?.lastName || ""} - #{ticket.id}
                  </p>
                </div>
                <Badge className={getStatusColor(ticket?.status || "")}>
                  {getStatusLabel(ticket?.status || "")}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
