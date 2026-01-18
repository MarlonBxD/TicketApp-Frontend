import { RouterProvider } from "react-router-dom"
import { appRouter } from "./app.router"
import {Toaster} from 'sonner'
export const TicketApp = () => {
  return (
    <>
    <Toaster />
    <RouterProvider router={appRouter} />;
    </>
  )
}
