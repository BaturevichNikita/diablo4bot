import { Chat } from './telegram';

export type Path = string;
export type Command = (chatId: Chat['id'], text?: string) => Promise<void>;

export enum MessagePaths {
  SCHEDULE = '/schedule',
  SUBSCRIBE = '/subscribe',
  UNSUBSCRIBE = '/unsubscribe',
  ECHO = '/echo',
}

export enum CallbackPaths {
  SUBSCRIBE = 'subscribe',
  UNSUBSCRIBE = 'unsubscribe',
  BACK = 'back',
}
