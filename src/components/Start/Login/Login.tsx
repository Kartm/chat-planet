import React, { Component } from 'react';
import './Login.css';
import SepiaInput from '../../reusable/SepiaInput/SepiaInput';
import SepiaButton from '../../reusable/SepiaButton/SepiaButton';
import { Events } from '../../../models/Events.enum';
import { Tabs } from '../../../models/Tabs.enum';
import { Socket } from 'socket.io';
import { User, Users } from '../../../models/User.interface';

type AboutProps = {
  socket: Socket | null;
  setUsers: (users: Users) => void;
  setTab: (tab: Tabs) => void;
  setUser: (user: User) => void;
};

class About extends Component<AboutProps> {
  state = {
    name: null as string | null,
    loginError: String.fromCharCode(160),
  };

  onInputChange = (value: string) => {
    this.setState({ name: value });
  };

  verifyLogin = () => {
    const { name } = this.state;
    if (name === null) {
      this.setState({
        loginError: 'Your name cannot be empty.',
      });
      return false;
    } else if (name.length < 3) {
      this.setState({
        loginError: 'Your name is too short. The minimum is 3 characters.',
      });
      return false;
    } else if (name.length > 32) {
      this.setState({
        loginError: 'Your name is too long. The maximum is 32 characters.',
      });
      return false;
    }
    this.setState({
      loginError: String.fromCharCode(160),
    });
    return true;
  };

  onLoginAttempt = () => {
    const { socket } = this.props;
    if (this.verifyLogin() && socket) {
      const data = {
        name: this.state.name,
      };

      socket.emit(Events.LOGIN_ATTEMPT, data);
    }
  };

  componentDidMount() {
    const { socket } = this.props;

    if (socket) {
      socket.on(Events.LOGIN_RESPONSE, ({ response }) => {
        if (response.error === null) {
          this.props.setUsers(response.users);
          this.props.setTab(Tabs.WORLDMAP);
          this.props.setUser(response.user);
        } else {
          this.setState({
            loginError: response.error,
          });
        }
      });
    }
  }

  render() {
    return (
      <div className="login">
        <form>
          <p>Your name:</p>
          <SepiaInput onInputChange={this.onInputChange} />
          <p className="login-error">{this.state.loginError}</p>
          <SepiaButton onClick={() => this.onLoginAttempt()}>LOGIN</SepiaButton>
        </form>
      </div>
    );
  }
}

export default About;
