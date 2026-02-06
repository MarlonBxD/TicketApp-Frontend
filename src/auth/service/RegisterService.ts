import { TicketApi } from "@/api/TicketApi";
import type { DefaultResponse } from "@/interfaces/DefaultResponse";
import { toast } from "sonner";


export const RegisterService = async (firstName: string, lastName: string, phone: string, email: string, username: string, password: string) => {
    try {
        const { data } = await TicketApi.post<DefaultResponse<null>>('/auth/register', {
            firstName,
            lastName,
            phone,
            email,
            username,
            password
});
        toast.success('Usuario registrado exitosamente');
        return data;

    } catch (error) {   
        console.log(error);
        toast.error('Error al registrar usuario');
        throw error;
    }
}