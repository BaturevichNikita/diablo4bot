import { Chat } from './telegram';

type ChatId = Chat['id'];
type EventType = 'non-season' | 'season';

export type UpdateSubscriptionsPayload = {
  chatId: ChatId;
  eventType: EventType;
  event: {
    key: string;
    value: boolean;
  };
};

export type GetSubscriptionPayload = {
  chatId: ChatId;
  eventType: EventType;
};

export type SubscriptionRecord = {
  chatId: ChatId;
  eventType: EventType;
  worldBoss?: boolean;
  helltide?: boolean;
  legion?: boolean;
};
