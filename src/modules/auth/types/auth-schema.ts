export interface AuthSchema {
    isLoading: boolean
    initAuth: boolean
    isAuth: boolean
    email: string
    password: string
    error?: string
    regSuccess: boolean
}
