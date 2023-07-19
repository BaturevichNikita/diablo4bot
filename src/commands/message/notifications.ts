import { tgBot } from '../../services/telegram';
import { Command } from '../../types/routing';
import { notificationKeyboard } from '../../utils/keyboard';

export const notificationsCommand: Command = async (chatId) => {
  const text = 'Adjust notifications about upcoming events:';
  const keyboard = notificationKeyboard();
  await tgBot.sendMessage(chatId, text, JSON.stringify(keyboard));
};
