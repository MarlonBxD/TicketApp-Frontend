import { TicketApi } from "@/api/TicketApi";
import type { DefaultResponse } from "@/interfaces/DefaultResponse";


interface Props {
    page: number;
    pageSize: number;
    sortBy: string;
    sortDirection: string;
    status: string;
    id?: string
    title?: string
    description?: string
    createdBy?: string
    assignedTo?: string
    createdAt?: string
    updatedAt?: string
}

export const getTickets = async (options: Props) => {
  const { page, pageSize, sortBy, sortDirection, status, id, title, description, createdBy, assignedTo, createdAt, updatedAt } = options;
  const { data } = await TicketApi.get<DefaultResponse>('/tickets', {
    params: {
      page,
      pageSize,
      sortBy,
      sortDirection,
      status,
      id,
      title,
      description,
      createdBy,
      assignedTo,
      createdAt,
      updatedAt
    }
  });
  console.log(data);
  return data;
};