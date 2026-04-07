export interface AuthUser {
    name: string
    email: string
}

export interface LoginPayload {
    email: string
    password: string
}

export interface LoginResponse {
    success: boolean
    user: AuthUser
}
