import { tgBot } from '../../services/telegram';
import { Command, CallbackPaths } from '../../types/routing';
import { getReplyMarkup } from '../../utils/keyboard';

export const subscribeCommand: Command = async (chatId) => {
  const text = 'Turn on notifications about:';
  const replyMarkup = getReplyMarkup(CallbackPaths.SUBSCRIBE);
  await tgBot.sendMessage(chatId, text, JSON.stringify(replyMarkup));
};
