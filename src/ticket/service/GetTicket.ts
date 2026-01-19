import { TicketApi } from "@/api/TicketApi";
import type { DefaultResponse, PageResponse, Ticket } from "@/interfaces/DefaultResponse";


interface Props {
  page?: number | undefined;
  pageSize?: number | undefined;
  sortBy?: string | undefined;
  sortDirection?: string | undefined;
  status?: string | undefined;
  id?: string | undefined;
  title?: string
  description?: string
  createdBy?: string
  assignedTo?: string
  createdAt?: string
  updatedAt?: string
}

export const getTickets = async (options: Props) => {
  const { page, pageSize, sortBy, sortDirection, status, id, title, description, createdBy, assignedTo, createdAt, updatedAt } = options;
  const { data } = await TicketApi.get<DefaultResponse<PageResponse<Ticket>>>('/tickets', {
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
  return data;
};

export const getTicketById = async (id: string) => {
  const { data } = await TicketApi.get<DefaultResponse<Ticket>>(`/tickets/${id}`);
  return data;
};

export const createTicket = async (ticket: Ticket) => {
  const { data } = await TicketApi.post<DefaultResponse<Ticket>>('/tickets', ticket);
  return data;
};
