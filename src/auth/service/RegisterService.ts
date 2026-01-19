import { TicketApi } from "@/api/TicketApi";
import type { DefaultResponse } from "@/interfaces/DefaultResponse";


export const RegisterService = async (firstname: string, lastname: string, phone: string, email: string, username: string, password: string) => {
    try {
        const {data} = await TicketApi.post<DefaultResponse<null>>('/auth/register', {
            firstname,
            lastname,
            phone,
            email,
            username,
            password
        });

        return data;

    } catch (error) {
        console.log(error);
        throw error;
    }
}