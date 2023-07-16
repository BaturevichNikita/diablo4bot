import { tgBot } from '../../services/telegram';
import { Command } from '../../types/routing';

const replyMarkup = {
  keyboard: [['/schedule', '/subscribe', '/unsubscribe']],
  one_time_keyboard: true,
};
const availableCommandsText = 'Available commands:';
const scheduleText = '/schedule - Provide schedule of upcoming events';
const subscribeText = '/subscribe - Enable notifications about upcoming events';
const unsubscribeText = '/unsubscribe - Disable notifications about upcoming events';
const text = [availableCommandsText, scheduleText, subscribeText, unsubscribeText].join('\n');

export const backCommand: Command = async (id) => {
  await tgBot.sendMessage(id, text, JSON.stringify(replyMarkup));
};