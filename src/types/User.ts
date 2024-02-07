export type User = {
    id: string,
    email: string
    team: number
}

export type Team = {
    id: number,
    users: string[],
    name: string
}