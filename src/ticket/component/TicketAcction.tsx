import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useState } from "react"
import { useAuthStore } from "@/auth/store/AuthStore"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAllUsers } from "@/user/service/UserService"
import { updateTicket } from "../service/GetTicket"

interface Props {
    ticketId: string
}

const Status = {
    OPEN: 'OPEN',
    IN_PROGRESS: 'IN_PROGRESS',
    RESOLVED: 'RESOLVED',
    CLOSED: 'CLOSED'
}

export function TicketActions({ ticketId }: Props) {
  const [selectedStatus, setSelectedStatus] = useState<string>("")
  const [selectedUser, setSelectedUser] = useState<string>("unassigned")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const { user } = useAuthStore()
  const queryClient = useQueryClient()

  const { data: usersData } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers({
      page: 0,
      sortBy: "createdAt", 
      role: "SUPPORT",
      sortDirection: "DESC"
    }),
  })

  const updateMutation = useMutation({
    mutationFn: (data: { status?: string; assignedTo?: string }) => 
      updateTicket(ticketId, data),
    onSuccess: () => {
      setSuccess(true)
      setError(null)
      queryClient.invalidateQueries({ queryKey: ["ticket", ticketId] })
      setTimeout(() => setSuccess(false), 3000)
    },
    onError: (err: any) => {
      setError(err.message || "Error al actualizar el ticket")
      setSuccess(false)
    }
  })

  if (!usersData) {
    return <div>Cargando usuarios...</div>
  }

  const supportUsers = usersData.body.content

  const handleUpdate = async () => {
    setError(null)
    setSuccess(false)

    const updateData: { status?: string; assignedTo?: string } = {}
    
    if (selectedStatus) {
      updateData.status = selectedStatus
    }
    
    if (selectedUser && selectedUser !== "unassigned") {
      updateData.assignedTo = selectedUser
    }

    if (Object.keys(updateData).length === 0) {
      setError("Selecciona al menos un campo para actualizar")
      return
    }

    updateMutation.mutate(updateData)
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
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(Status).map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {user?.roles?.[0]?.name === "ADMIN" && (
          <div className="space-y-2">
            <Label htmlFor="assignedTo">Asignar a</Label>
            <Select value={selectedUser} onValueChange={setSelectedUser}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar usuario" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unassigned">Sin asignar</SelectItem>
                {supportUsers.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.firstName + " " + user.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <Button 
          onClick={handleUpdate} 
          disabled={updateMutation.isPending} 
          className="w-full"
        >
          {updateMutation.isPending ? "Actualizando..." : "Actualizar Ticket"}
        </Button>
      </CardContent>
    </Card>
  )
}