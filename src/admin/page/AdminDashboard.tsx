import { useAuthStore } from "@/auth/store/AuthStore";
import { AdminStats } from "../component/AdminStats";
import { UsersTable } from "../component/UserTable";
import { AllTicketsTable } from "../component/AllTicketTable";
import { DashboardHeader } from "@/dashboard/component/DashboardHeader";

export const AdminDashboard = () => {

    const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader username={`${user?.firstName} ${user?.lastName}`} role="ADMIN" />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Panel de Administración</h1>
          <p className="text-muted-foreground">Gestión completa del sistema de tickets</p>
        </div>
        <AdminStats />
        <div className="grid gap-8 lg:grid-cols-2 mt-8">
          <UsersTable />
          <AllTicketsTable />
        </div>
      </main>
    </div>
  )
}
