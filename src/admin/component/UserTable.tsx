import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export async function UsersTable() {

    const users = [
        {
            id: 1,
            full_name: "Marlon Buelvas",
            role: "ADMIN"
        },
        {
            id: 2,
            full_name: "Juan Perez",
            role: "SUPPORT"
        },
        {
            id: 3,
            full_name: "Maria Lopez",
            role: "USER"
        },
    ]
  
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
        return role
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
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                <div>
                  <p className="font-semibold">{user.full_name}</p>
                  <p className="text-sm text-muted-foreground">{user.id}</p>
                </div>
                <Badge className={getRoleColor(user.role)}>{getRoleLabel(user.role)}</Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
