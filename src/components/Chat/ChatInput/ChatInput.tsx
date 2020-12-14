import React, { ChangeEvent, Component, FormEvent } from 'react';
import './ChatInput.css';

type ChatInputProps = {
  onSend: ({ value }: { value: string }) => void;
};

class ChatInput extends Component<ChatInputProps> {
  state = { value: '' };

  onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ value: e.target.value });
  };

  onSubmit = (e: FormEvent<HTMLFormElement> | FormEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const { value } = this.state;
    if (value !== '') {
      this.props.onSend({ value });
      this.setState({ value: '' });
    }
  };

  // TS Error: Type 'KeyboardEvent' is not generic.
  onKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      this.onSubmit(e);
    }
  };

  render() {
    const isMsgEmpty = this.state.value === '';
    let btnClassName = 'button button--sepia ';
    if (isMsgEmpty) btnClassName += 'button--sepia--hidden';
    return (
      <form onSubmit={this.onSubmit} onKeyDown={this.onKeyDown} className="chat-input">
        <textarea
          className="input input--sepia"
          value={this.state.value}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
        <button disabled={isMsgEmpty} type="submit" className={btnClassName}>
          Send
        </button>
      </form>
    );
  }
}
export default ChatInput;
