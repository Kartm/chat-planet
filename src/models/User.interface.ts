export enum UserStatus {
    FREE = 'FREE',
    BUSY = 'BUSY'
}

export interface Users {
    [id: string]: User
}

export interface User {
    readonly id: string
    name: string
    ip: string
    socketId: string
    countryCode: string
    latitude: number
    longitude: number
    chatroomId: string | null
    status: UserStatus
}
