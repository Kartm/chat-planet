import React, { Component } from 'react';

class Chat extends Component {
  state = {
    partner: {
      nickname: 'Dezanek',
      countryName: 'Poland',
      countryCode: 'PL'
    }
  };

  render() {
    return (
      <div className='chat-wrapper small-shadow'>
        <div className='chat-header-wrapper'>
          <div className='chat-header-text'>
            <span>
              You're chatting with <b>{this.state.partner.nickname}</b> from {this.state.partner.countryName}
            </span>
          </div>
          <img
            className='partner-flag'
            alt='Partner flag icon.'
            src={`https://www.countryflags.io/${this.state.partner.countryCode}/flat/64.png`}
          />
        </div>
        <div className='chat-text-wrapper'>
          <div className='chat-messages-wrapper'>
            <div className='chat-messages-wrapper-scrollview'>
              <div className='message'>
                <span>
                  <b>Jack: </b>new message
                </span>
              </div>
              <div className='message'>
                <span>
                  <b>Araszek: </b>eldo
                </span>
              </div>
              <div className='message'>
                <span>
                  <b>Dezanek: </b>no elo
                </span>
              </div>
              <div className='message'>
                <span>
                  <b>Araszek: </b>eldo
                </span>
              </div>
              <div className='message'>
                <span>
                  <b>Dezanek: </b>no elo
                </span>
              </div>
              <div className='message'>
                <span>
                  <b>Araszek: </b>eldo
                </span>
              </div>
              <div className='message'>
                <span>
                  <b>Dezanek: </b>no elo
                </span>
              </div>
              <div className='message'>
                <span>
                  <b>Araszek: </b>eldo
                </span>
              </div>
              <div className='message'>
                <span>
                  <b>Dezanek: </b>no elo
                </span>
              </div>
              <div className='message'>
                <span>
                  <b>Araszek: </b>eldo
                </span>
              </div>
              <div className='message'>
                <span>
                  <b>Dezanek: </b>no elo
                </span>
              </div>
              <div className='message'>
                <span>
                  <b>Araszek: </b>eldo
                </span>
              </div>
              <div className='message'>
                <span>
                  <b>Dezanek: </b>no elo
                </span>
              </div>
              <div className='message'>
                <span>
                  <b>Araszek: </b>eldo
                </span>
              </div>
              <div className='message'>
                <span>
                  <b>Dezanek: </b>no elo
                </span>
              </div>
              <div className='message'>
                <span>
                  <b>Araszek: </b>eldo
                </span>
              </div>
              <div className='message'>
                <span>
                  <b>Dezanek: </b>no elo
                </span>
              </div>
              <div className='message'>
                <span>
                  <b>Araszek: </b>eldo
                </span>
              </div>
              <div className='message'>
                <span>
                  <b>Dezanek: </b>no elo
                </span>
              </div>
              <div className='message'>
                <span>
                  <b>Araszek: </b>eldo
                </span>
              </div>
              <div className='message'>
                <span>
                  <b>Dezanek: </b>no elo
                </span>
              </div>
              <div className='message'>
                <span>
                  <b>Araszek: </b>eldo
                </span>
              </div>
              <div className='message'>
                <span>
                  <b>Dezanek: </b>no elo
                </span>
              </div>
              <div className='message'>
                <span>
                  <b>Araszek: </b>eldo
                </span>
              </div>
              <div className='message'>
                <span>
                  <b>Dezanek: </b>no elo
                </span>
              </div>
              <div className='message'>
                <span>
                  <b>Araszek: </b>eldo
                </span>
              </div>
              <div className='message'>
                <span>
                  <b>Dezanek: </b>no elo
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='chat-input-wrapper'>
          <form className='chat-input-form'>
            <input className='nickname-input chat-input-element' type='text' />
            <button className='join-button chat-input-button'>Send</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Chat;
