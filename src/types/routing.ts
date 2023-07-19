import { Chat } from './telegram';

export type Path = string;
export type Command = (chatId: Chat['id'], text?: string) => Promise<void>;

export enum MessagePaths {
  START = '/start',
  SCHEDULE = '/schedule',
  STATUS = '/status',
  NOTIFICATIONS = '/notifications',
  ECHO = '/echo',
}

export enum CallbackPaths {
  NOTIFICATIONS = 'notifications',
}

export enum NotificationStatus {
  TURN_ON = 'turn_on',
  TURN_OFF = 'turn_off',
}

export enum NotificationEvents {
  WORLD_BOSS = 'world_boss',
  HELLTIDE = 'helltide',
  LEGION = 'legion',
}
