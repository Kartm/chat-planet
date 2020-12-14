import React, { Component } from 'react'
import './Chat.css'
import ChatHeader from './ChatHeader/ChatHeader'
import ChatMessages from './ChatMessages/ChatMessages'
import ChatInput from './ChatInput/ChatInput'
import { Events } from '../../models/Events.enum'
import { Chatroom } from '../../models/Chatroom.interface'
import { User, Users } from '../../models/User.interface'
import { Socket } from 'socket.io'
import { ChatMessage } from '../../models/ChatMessage.interface'

type ChatProps = {
    chat: Chatroom | null
    socket: Socket | null
    user: User | null
    users: Users | null
    onMessageSend: ({ message }: { message: ChatMessage }) => void
    onChatLeave: () => void
}

class Chat extends Component<ChatProps> {
    state = {
        messages: this.props.chat ? this.props.chat.messages : []
    }

    getPartner = ({ user, users }: { user: User | null; users: Users | null }) => {
        if(user && users) {
            let result = Object.values(users).filter(arrUser => {
                if (arrUser.chatroomId === user.chatroomId) {
                    if (arrUser.id !== user.id) return true
                    return false
                }
                return false
            })
            return result.pop() as User
        }
        return null;
    }

    onSend = ({ value }: { value: string }) => {
        const { socket, user } = this.props

        if (user && socket) {
            let message: ChatMessage = {
                who: this.props.user as User,
                content: value
            }
            this.props.onMessageSend({ message })
            socket.emit(Events.CHAT_MESSAGE, { message })
        }
    }

    render() {
        const { chat, user, users, onChatLeave } = this.props
        return (
            <div className="chat">
                <ChatHeader
                    onChatLeave={onChatLeave}
                    partner={this.getPartner({ user, users })}
                />
                <ChatMessages user={user} messages={chat ? chat.messages : null} />
                <ChatInput onSend={this.onSend} />
            </div>
        )
    }
}

export default Chat
