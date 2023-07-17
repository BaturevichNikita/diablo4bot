import { tgBot } from '../../services/telegram';
import { Command } from '../../types/routing';
import { availableCommands } from '../../utils/commands';

export const startCommand: Command = async (chatId) => {
  await tgBot.sendMessage(chatId, availableCommands);
};
