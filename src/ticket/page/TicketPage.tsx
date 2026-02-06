import { TicketDetails } from "../component/TicketDetail"
import { TicketActions } from "../component/TicketAcction"
import { useParams } from "react-router-dom"

export function TicketPageId() {

  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <TicketDetails id={id!} />
        <TicketActions ticketId={id!} />
      </main>
    </div>
  )
} 
