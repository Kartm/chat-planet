import React, { CSSProperties } from 'react';
import { ChatMessage as ChatMessageModel } from '../../../../models/ChatMessage.interface';
import './ChatMessage.css';

type ChatMessageProps = {
  isMine: boolean;
  message: ChatMessageModel;
};

const ChatMessage = (props: ChatMessageProps) => {
  let myStyle: CSSProperties = {
    backgroundColor: props.isMine ? '#00000080' : 'initial',
  };

  return (
    <div className="message">
      <span style={myStyle}>
        <b>{props.message.who.name}: </b>
        {props.message.content}
      </span>
    </div>
  );
};

export default ChatMessage;
