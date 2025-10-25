export interface User {
    id: string
    firstName: string
    lastName?: string
    email?: string
    username?: string
    avatar?: string
}


export type Radius = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'pill'