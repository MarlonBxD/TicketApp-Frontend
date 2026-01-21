
import { NuevoTicketForm } from "../component/NuevoTicketForm"

export function NewTicketPage() {
  return (
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Crear Nuevo Ticket</h1>
          <p className="text-muted-foreground">Completa el formulario para crear un ticket de soporte</p>
        </div>
        <NuevoTicketForm />
      </main>
  )
}
