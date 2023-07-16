import { updateItem } from '../../services/dynamodb';
import { tgBot } from '../../services/telegram';
import { Command } from '../../types/routing';
import { capitalize, convertToCamelCase } from '../../utils/text-formatter';

export const subscribeCommand: Command = async (id, data) => {
  const subscribeType = data?.split('-').pop();
  if (!subscribeType) return Promise.reject('Invalid callback query data!');

  const formattedSubscribeType = capitalize(subscribeType);
  const subscribeTypeDbKey = convertToCamelCase(subscribeType);

  console.log(`Subscribe on ${formattedSubscribeType} events`);

  await updateItem({ chatId: id, eventType: 'non-season', event: { key: subscribeTypeDbKey, value: true } });

  await tgBot.sendMessage(id, `You were subscribed on ${formattedSubscribeType} events`);
};
