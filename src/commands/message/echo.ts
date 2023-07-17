import { tgBot } from '../../services/telegram';
import { Command } from '../../types/routing';
import { availableCommands } from '../../utils/commands';

export const echoCommand: Command = async (chatId, text?) => {
  await tgBot.sendMessage(chatId, `Unavailable command: ${text}\n${availableCommands}`);
};
