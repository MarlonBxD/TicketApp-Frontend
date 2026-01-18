export interface AuthResponse {
    httpCode:     number;
    token:        string;
    type:         string;
    refreshToken: string;
    firstName:    string;
    lastName:     string;
}