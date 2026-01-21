import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useNavigate } from "react-router-dom"
import { createTicket } from "../service/GetTicket"
import type { CreateTicketRequest } from "@/interfaces/CreateTicketRequest"


export function NuevoTicketForm() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const title = formData.get('title') as string
    const description = formData.get('description') as string

    const ticketRequest: CreateTicketRequest = {
      title,
      description,
      status: 'CREATE',
    }

    try {
      const response = await createTicket(ticketRequest)
      console.log('Ticket creado:', response)
      
      if (response && response.body) {
        navigate(`/dashboard`)
      } else {
        navigate('/dashboard')
      }
    } catch (error: any) {
      console.error("Error creating ticket:", error)
      const errorMessage = error.response?.data?.message || "Error al crear el ticket. Por favor intente nuevamente."
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/dashboard')
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Título del Ticket</Label>
            <Input
              id="title"
              type="text"
              placeholder="Describe el problema brevemente"
              name="title"
              required
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Describe el problema con el mayor detalle posible"
              name="description"
              required
              maxLength={500}
              rows={6}
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Creando..." : "Crear Ticket"}
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel} disabled={loading}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}