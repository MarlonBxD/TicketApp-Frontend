import { TicketApi } from "@/api/TicketApi";
import type { AuthResponse } from "../interface/AuthResponse";


export const LoginService = async (username: string, password: string) => {
    try {
        const { data } = await TicketApi.post<AuthResponse>('/auth/login', {
            username,
            password
        });

        localStorage.setItem('token', data.token);
        return data;

    } catch (error) {
        console.log(error);
        return null;
    }
}