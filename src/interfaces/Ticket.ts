import type { Status } from "./Status";
import type { User } from "./User";

export interface Ticket {
    id:          string;
    title:       string;
    description: string;
    status:      Status;
    createdBy:   User;
    assignedTo:  User;
    createdAt:   Date;
    updatedAt:   null;
}