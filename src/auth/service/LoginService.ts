import { TicketApi } from "@/api/TicketApi";
import type { AuthResponse } from "../interface/AuthResponse";


export const LoginService = async (username: string, password: string) => {
    try {
        const {data} = await TicketApi.post<AuthResponse>('/auth/login', {
             username, 
             password 
            });
            
        console.log(data.token);
        return data;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}