import type { User } from "@/interfaces/DefaultResponse";

export interface AuthResponse {
    httpCode:     number;
    token:        string;
    type:         string;
    refreshToken: string;
    user:         User;
}