
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useState } from "react"
import { useAuthStore } from "@/auth/store/AuthStore"


export function TicketActions() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)


  const { user } = useAuthStore();

  const supportUsers = [
    { id: "1", full_name: "Usuario 1" },
    { id: "2", full_name: "Usuario 2" },
    { id: "3", full_name: "Usuario 3" },
  ]

  const handleUpdate = async () => {
    setLoading(true)
    setError(null)
    setSuccess(false)
  }

  if (user?.roles[0].name !== 'ADMIN' && user?.roles[0].name !== 'SUPPORT') {
    return null
  }


  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Acciones del Ticket</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert>
            <AlertDescription>Ticket actualizado correctamente</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="status">Estado</Label>
          <Select value={"1"} onValueChange={handleUpdate}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Abierto</SelectItem>
              <SelectItem value="2">En Progreso</SelectItem>
              <SelectItem value="3">Resuelto</SelectItem>
              <SelectItem value="4">Cerrado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {user?.roles[0].name === "ADMIN" && (
          <div className="space-y-2">
            <Label htmlFor="assignedTo">Asignar a</Label>
            <Select value={"unassigned"} onValueChange={() => {}}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar usuario" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unassigned">Sin asignar</SelectItem>
                {supportUsers.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.full_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <Button onClick={handleUpdate} disabled={loading} className="w-full">
          {loading ? "Actualizando..." : "Actualizar Ticket"}
        </Button>
      </CardContent>
    </Card>
  )
}
