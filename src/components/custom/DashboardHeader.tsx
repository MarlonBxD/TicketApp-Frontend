import { Button } from "@/components/ui/button"
import { LogOut, Ticket, Plus, Settings } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Link } from "react-router-dom"
import { useAuthStore } from "@/auth/store/AuthStore"

interface Props {
  username?: string
  role?: string
  
}

export function DashboardHeader({ username, role }: Props) {

  const { logout } = useAuthStore();


  const handleLogout = async () => {
    logout();
  }

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "?"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Ticket className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xl font-bold">Sistema de Tickets</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link to="/tickets/nuevo">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Ticket
            </Button>
          </Link>

          {role === "ADMIN" && (
            <Link to="/admin">
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Administración
              </Button>
            </Link>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarFallback>{getInitials(username )}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{username || "Usuario"}</p>
                  <p className="text-xs text-muted-foreground capitalize">{role?.toLowerCase()}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  )
}
