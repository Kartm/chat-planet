import React from 'react';
import './Tab.css';
import Start from '../Start/Start';
import MapWrapper from '../MapWrapper/MapWrapper';
import Chat from '../Chat/Chat';
import { Tabs } from '../../models/Tabs.enum';
import { User, Users } from '../../models/User.interface';
import { Socket } from 'socket.io';
import Invitation from '../../models/Invitation';
import { Chatroom } from '../../models/Chatroom.interface';
import { ChatMessage } from '../../models/ChatMessage.interface';

type TabProps = {
  tab: Tabs;
  user: User | null;
  users: Users | null;
  socket: Socket | null;
  chat: Chatroom | null;
  setUsers: (users: Users) => void;
  setUser: (user: User) => void;
  setTab: (tab: Tabs) => void;
  sendInvitation: (invitation: Invitation) => void;
  onMessageSend: ({ message }: { message: ChatMessage }) => void;
  onChatLeave: () => void;
};

const Tab = (props: TabProps) => {
  let element;
  switch (props.tab) {
    case Tabs.START:
      element = <Start socket={props.socket} setUsers={props.setUsers} setUser={props.setUser} setTab={props.setTab} />;
      break;
    case Tabs.WORLDMAP:
      element = <MapWrapper user={props.user} users={props.users} sendInvitation={props.sendInvitation} />;
      break;
    default:
      element = (
        <Chat
          user={props.user}
          users={props.users}
          chat={props.chat}
          socket={props.socket}
          onMessageSend={props.onMessageSend}
          onChatLeave={props.onChatLeave}
        />
      );
      break;
  }
  return <div className="tab">{element}</div>;
};

export default Tab;
