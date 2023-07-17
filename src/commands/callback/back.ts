import { tgBot } from '../../services/telegram';
import { Command } from '../../types/routing';
import { availableCommands } from '../../utils/commands';

export const backCommand: Command = async (id) => {
  await tgBot.sendMessage(id, availableCommands);
};
