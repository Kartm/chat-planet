import { User } from './User.interface';

export interface ChatMessage {
  who: User;
  content: string;
}
