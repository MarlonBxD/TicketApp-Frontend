
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "@/auth/store/AuthStore"
import { createTicket } from "../service/GetTicket"

import type { Ticket } from "@/interfaces/DefaultResponse"



export function NuevoTicketForm() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  const { user } = useAuthStore()

  if (!user) {
    navigate('/auth/login')
    return
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const title = formData.get('title') as string
    const description = formData.get('description') as string

    const ticketRequest: Ticket = {
      title,
      description,
      createdBy: user,
      assignedTo: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    try {
      const response = await createTicket(ticketRequest)
      if (response && response.body) {
        navigate(`/ticket/${response.body.id}`)
      }
    } catch (error) {
      console.error("Error creating ticket:", error)
      setError("Error al crear el ticket. Por favor intente nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setLoading(false)
    setError(null)
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
            />
          </div>


          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Describe el problema con el mayor detalle posible"
              name="description"
              required
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Creando..." : "Crear Ticket"}
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
