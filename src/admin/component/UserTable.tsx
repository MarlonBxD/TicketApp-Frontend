import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { User } from "@/interfaces/DefaultResponse"

interface Props {
    users: User[]
}
export const UsersTable = ({users}: Props) => {
  
  const getRoleColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-500/10 text-red-500"
      case "SUPPORT":
        return "bg-blue-500/10 text-blue-500"
      case "USER":
        return "bg-green-500/10 text-green-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "Administrador"
      case "SUPPORT":
        return "Soporte"
      case "USER":
        return "Usuario"
      default:
        return "Sin rol"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Usuarios del Sistema</CardTitle>
        <CardDescription>Lista de usuarios registrados</CardDescription>
      </CardHeader>
      <CardContent>
        {!users || users.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No hay usuarios registrados</p>
        ) : (
          <div className="space-y-4">
            {users.map((user) => {
              const roleName = user.roles?.[0]?.name || ""
              
              return (
                <div key={user.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                  <div>
                    <p className="font-semibold">{user.firstName} {user.lastName}</p>
                    <p className="text-sm text-muted-foreground">{user.id}</p>
                  </div>
                  <Badge className={getRoleColor(roleName)}>{getRoleLabel(roleName)}</Badge>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}