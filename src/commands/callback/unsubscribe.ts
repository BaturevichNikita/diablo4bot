import { updateItem } from '../../services/dynamodb';
import { tgBot } from '../../services/telegram';
import { Command } from '../../types/routing';
import { capitalize, convertToCamelCase } from '../../utils/text-formatter';

export const unsubscribeCommand: Command = async (id, data) => {
  const unsubscribeType = data?.split('-').pop();
  if (!unsubscribeType) return Promise.reject('Invalid callback query data!');

  const formattedUnsubscribeType = capitalize(unsubscribeType);
  const subscribeTypeDbKey = convertToCamelCase(unsubscribeType);

  await updateItem({ chatId: id, eventType: 'non-season', event: { key: subscribeTypeDbKey, value: false } });

  await tgBot.sendMessage(id, `You were unsubscribed from ${formattedUnsubscribeType} events`);
};
