import { tgBot } from '../../services/telegram';
import { CallbackPaths, Command } from '../../types/routing';
import { getReplyMarkup } from '../../utils/keyboard';

export const unsubscribeCommand: Command = async (chatId) => {
  const text = 'Turn off notifications about:';
  const replyMarkup = getReplyMarkup(CallbackPaths.SUBSCRIBE);
  await tgBot.sendMessage(chatId, text, JSON.stringify(replyMarkup));
};
