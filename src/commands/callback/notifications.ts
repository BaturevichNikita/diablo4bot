import { updateNotifications } from '../../services/dynamodb';
import { tgBot } from '../../services/telegram';
import { Command, NotificationEvents, NotificationStatus } from '../../types/routing';

const statusHelper = {
  [NotificationStatus.TURN_ON]: {
    formatted: 'Turn On',
    pastTense: 'Turned On',
  },
  [NotificationStatus.TURN_OFF]: {
    formatted: 'Turn Off',
    pastTense: 'Turned Off',
  },
};

const eventHelper = {
  [NotificationEvents.WORLD_BOSS]: {
    formatted: 'World Boss',
    dbKey: 'worldBoss',
  },
  [NotificationEvents.HELLTIDE]: {
    formatted: 'Helltide',
    dbKey: 'helltide',
  },
  [NotificationEvents.LEGION]: {
    formatted: 'Legion',
    dbKey: 'legion',
  },
};

export const notificationsCommand: Command = async (id, data) => {
  console.log({ id, data }, 'Invoke notifications callback command');

  const [event, status] = data?.split('-') || [];
  if (!event || !status) return Promise.reject('Invalid callback query data!');

  const { dbKey, formatted: formattedEvent } = eventHelper[event as NotificationEvents];
  const { formatted: formattedStatus, pastTense } = statusHelper[status as NotificationStatus];

  console.log(`${formattedStatus} ${formattedEvent} notifications`);

  await updateNotifications({
    chatId: id,
    event: { key: dbKey, value: status === NotificationStatus.TURN_ON },
  });

  await tgBot.sendMessage(id, `You ${pastTense} notifications about ${formattedEvent}.`);
};
