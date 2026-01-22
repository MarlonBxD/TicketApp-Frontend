import { useQuery } from "@tanstack/react-query";
import { getTickets } from "@/ticket/service/GetTicket";
import { useSearchParams } from "react-router-dom";

export const useTickets = () => {

    const [searchParams] = useSearchParams();
    const page = searchParams.get('page') || '1';
    const pageSize = searchParams.get('pageSize') || '10';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortDirection = searchParams.get('sortDirection') || 'desc';
    const status = searchParams.get('status') || 'OPEN';
    const id = searchParams.get('id') || '';
    const title = searchParams.get('title') || '';
    const description = searchParams.get('description') || '';
    const createdBy = searchParams.get('createdBy') || '';
    const assignedTo = searchParams.get('assignedTo') || '';
    const createdAt = searchParams.get('createdAt') || '';
    const updatedAt = searchParams.get('updatedAt') || '';

    return useQuery({
        queryKey: ['tickets', { page, pageSize, sortBy, sortDirection, status, id, title, description, createdBy, assignedTo, createdAt, updatedAt }],
        queryFn: () => getTickets({
            page: Number(page),
            pageSize: Number(pageSize),
            sortBy: String(sortBy),
            sortDirection: String(sortDirection),
            status: String(status),
            id: String(id),
            title: String(title),
            description: String(description),
            createdById: String(createdBy),
            assignedTo: String(assignedTo),
            createdAt: String(createdAt),
            updatedAt: String(updatedAt)
        })
    })
}