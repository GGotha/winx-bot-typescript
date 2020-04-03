export interface Member {
  user: User;
  send(value: any): any;
}

export interface User {
  id: number;
  avatarURL: string;
}

export interface Client {
  prefix: string;
  commands: string;
}
