export interface DefaultResponse {
    error:      boolean;
    message:    string;
    httpStatus: string;
    httpCode:   number;
    body:       Body;
}

export interface Body {
    content:          Ticket[];
    pageable:         Pageable;
    totalElements:    number;
    totalPages:       number;
    last:             boolean;
    numberOfElements: number;
    size:             number;
    number:           number;
    sort:             Sort;
    first:            boolean;
    empty:            boolean;
}

export interface Ticket {
    id:          string;
    title:       string;
    description: string;
    status:      string;
    createdBy:   User;
    assignedTo:  User;
    createdAt:   Date;
    updatedAt:   null;
}

export interface User {
    id:        string;
    username:  string;
    email:     string;
    firstName: string;
    lastName:  string;
    phone:     string;
    active:    boolean;
}

export interface Pageable {
    pageNumber: number;
    pageSize:   number;
    sort:       Sort;
    offset:     number;
    paged:      boolean;
    unpaged:    boolean;
}

export interface Sort {
    sorted:   boolean;
    unsorted: boolean;
    empty:    boolean;
}


