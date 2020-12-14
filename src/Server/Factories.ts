import uuidv4 from 'uuid/v4'
import { User, UserStatus } from '../models/User.interface'

export const createUser = (
    name: string,
    socketId: string,
    ip: string,
    countryCode: string,
    latitude: number,
    longitude: number
) =>
    ({
        id: uuidv4(),
        name,
        ip,
        socketId,
        countryCode,
        latitude,
        longitude,
        chatroomId: null,
        status: UserStatus.FREE
    } as User)

export const createChatroom = ({ from, to }: { from: User; to: User }) => ({
    id: uuidv4(),
    users: { from, to },
    messages: []
})
