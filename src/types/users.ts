export type User = {
    id: number,
    name: string,
    email: string,
    phone: string,
    website: string,
    address: string
}

export type SortFields = keyof Omit<User, 'id'>