import React, { Component } from 'react';
import './App.css';
import './reset.css';
import './responsive.css';
import { Tabs } from '../../models/Tabs.enum';
import Header from '../Header/Header';
import Tab from '../Tab/Tab';
import InvitationModal from '../InvitationModal/InvitationModal';
import InformationModal from '../InformationModal/InformationModal';

import io from 'socket.io-client';
import { Events } from '../../models/Events.enum';
import Invitation from '../../models/Invitation';
import { User, Users } from '../../models/User.interface';
import { Socket } from 'socket.io';
import { Chatroom } from '../../models/Chatroom.interface';
import { ChatMessage } from '../../models/ChatMessage.interface';

let socketUrl = 'wss://' + window.location.hostname;
if (process.env.NODE_ENV === 'development') {
  socketUrl = 'http://localhost:3231';
}

class App extends Component {
  state = {
    user: null as User | null,
    users: null as Users | null,
    socket: null as Socket | null,
    invitation: null,
    information: null,
    tab: Tabs.START,
    chat: null as Chatroom | null,
  };

  componentDidMount() {
    const socket = io.connect(socketUrl, { secure: true });
    this.setState({ socket });
    socket.on('connect', () => {
      console.log('Connected to server.');
    });

    socket.on(Events.REFRESH_USERS, ({ users }: { users: Users }) => {
      this.setUsers(users);
      let { user } = this.state;
      if (user) {
        let newUser = users[user.id];
        this.setState({ user: newUser });
      }
    });

    socket.on(Events.INVITATION_GOT, ({ invitation }: { invitation: Invitation }) => {
      this.setState({ invitation });
    });

    socket.on(Events.CHATROOM_CREATE, ({ chat }: { chat: Chatroom }) => {
      this.setState({ chat }, () => {
        this.setTab(Tabs.CHAT);
      });
    });

    socket.on(Events.CHAT_MESSAGE, ({ message }: { message: ChatMessage }) => {
      this.addNewMessage({ message });
    });

    socket.on(Events.CHAT_LEAVE, () => {
      this.setTab(Tabs.WORLDMAP);
      this.setState({ chat: null });
      this.setState({ information: 'Your chat has ended.' });
    });
  }

  setUser = (user: User) => {
    this.setState({ user });
  };

  setUsers = (users: Users) => {
    this.setState({ users });
  };

  setTab = (tab: Tabs) => {
    this.setState({ tab });
  };

  onInvitationAccept = () => {
    const { socket, invitation } = this.state;
    if (socket) {
      socket.emit(Events.INVITATION_ACCEPT, { invitation });
    }
  };

  onInvitationClose = () => {
    this.setState({ invitation: null });
  };

  onInformationClose = () => {
    this.setState({ information: null });
  };

  sendInvitation = ({ from, to }: { from: User; to: User }) => {
    const { socket } = this.state;
    const invitation = new Invitation({
      from,
      to,
    });

    if (socket) {
      socket.emit(Events.INVITATION_SENT, { invitation });
    }
  };

  addNewMessage = ({ message }: { message: ChatMessage }) => {
    this.setState({
      chat: {
        ...this.state.chat,
        messages: this.state.chat ? [...this.state.chat.messages, message] : [message],
      },
    });
  };

  onChatLeave = () => {
    const { socket } = this.state;
    if (socket) {
      socket.emit(Events.CHAT_LEAVE, null);
    }
  };

  render() {
    return (
      <React.Fragment>
        <InvitationModal
          invitation={this.state.invitation}
          onAccept={this.onInvitationAccept}
          onClose={this.onInvitationClose}
        />
        <InformationModal information={this.state.information} onClose={this.onInformationClose} />

        <Header
          setTab={this.setTab}
          activeTab={this.state.tab}
          user={this.state.user}
          users={this.state.users}
          isLoggedIn={this.state.user !== null}
          isChatActive={this.state.chat !== null}
        />
        <Tab
          chat={this.state.chat}
          socket={this.state.socket}
          setUsers={this.setUsers}
          setUser={this.setUser}
          setTab={this.setTab}
          sendInvitation={this.sendInvitation}
          user={this.state.user}
          users={this.state.users}
          tab={this.state.tab}
          onMessageSend={this.addNewMessage}
          onChatLeave={this.onChatLeave}
        />
      </React.Fragment>
    );
  }
}

export default App;
