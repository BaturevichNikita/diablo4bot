import { Chat } from './telegram';

type ChatId = Chat['id'];

export type UpdateNotificationsPayload = {
  chatId: ChatId;
  event: {
    key: string;
    value: boolean;
  };
};

export type GetNotificationPayload = {
  chatId: ChatId;
};

export type NotificationRecord = {
  chatId: ChatId;
  worldBoss?: boolean;
  helltide?: boolean;
  legion?: boolean;
};
