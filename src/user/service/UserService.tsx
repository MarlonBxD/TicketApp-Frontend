import { TicketApi } from "@/api/TicketApi";
import type { DefaultResponse, PageResponse, User } from "@/interfaces/DefaultResponse";


interface Props {
  page?: number | undefined;
  pageSize?: number | undefined;
  sortBy?: string | undefined;
  sortDirection?: string | undefined;
  id?: string | undefined;
  username?: string | undefined;
  email?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  phone?: string | undefined;
  active?: boolean | undefined;
  role?: string | undefined;
}


export const getAllUsers = async (options: Props) => {
    const { page, pageSize, sortBy, sortDirection, id, username, email, firstName, lastName, phone, role } = options;
    const { data } = await TicketApi.get<DefaultResponse<PageResponse<User>>>("/users", {
        params: {
            page,
            pageSize,
            sortBy,
            sortDirection,
            id,
            username,
            email,
            firstName,
            lastName,
            phone,
            role
        }
    });
    return data;
};