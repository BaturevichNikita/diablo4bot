import { tgBot } from '../../services/telegram';
import { Command } from '../../types/routing';

export const echoCommand: Command = async (chatId, text?) => {
  await tgBot.sendMessage(chatId, `You sent: ${text}`);
};
