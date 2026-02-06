import { TicketApi } from "@/api/TicketApi";
import type { AuthResponse } from "../interface/AuthResponse";
import { toast } from "sonner";


export const LoginService = async (username: string, password: string) => {
    try {
        const { data } = await TicketApi.post<AuthResponse>('/auth/login', {
            username,
            password
        });

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data;

    } catch (error) {
        console.log(error);
        toast.error('Error al iniciar sesión');
        return null;
    }
}