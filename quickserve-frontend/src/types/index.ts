export interface User {
    id?: string;
    fullName: string;
    email: string;
    role: 'ROLE_CLIENT' | 'ROLE_PROVIDER';
    expertise?: string;
}

export interface ServiceRequest {
    id?: string;
    clientId: string;
    providerId?: string;
    serviceType: string;
    description: string;
    status: 'PENDING' | 'ACCEPTED' | 'COMPLETED';
    createdAt?: string;
}

export interface AuthResponse {
    token: string;
}