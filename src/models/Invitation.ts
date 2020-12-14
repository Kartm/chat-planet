import { User } from './User.interface';

export default class Invitation {
  from: User;
  to: User;

  constructor({ from, to }: { from: User; to: User }) {
    this.from = from;
    this.to = to;
  }
}
