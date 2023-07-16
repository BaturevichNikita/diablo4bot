import { tgBot } from '../../services/telegram';
import { Command } from '../../types/routing';
import { capitalize, convertToCamelCase } from '../../utils/text-formatter';

export const unsubscribeCommand: Command = async (id, data) => {
  const unsubscribeType = data?.split('-').pop();
  if (!unsubscribeType) return Promise.reject('Invalid callback query data!');

  const formattedUnsubscribeType = capitalize(unsubscribeType);
  const subscribeTypeDbKey = convertToCamelCase(unsubscribeType);

  console.log(`Unsubscribe on ${formattedUnsubscribeType} events`);

  await tgBot.sendMessage(id, `You are going to disable notification about ${formattedUnsubscribeType} events`);
};
