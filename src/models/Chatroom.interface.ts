export interface Chatroom {
  readonly id: string;
  users: {
    from: null;
    to: null;
  };
  messages: [];
}
