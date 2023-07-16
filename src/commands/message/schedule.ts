import { getSchedule } from '../../services/events';
import { tgBot } from '../../services/telegram';
import { Command } from '../../types/routing';

export const scheduleCommand: Command = async (chatId) => {
  try {
    const schedule = await getSchedule();
    const text = schedule.map(({ text }) => text).join('\n');
    await tgBot.sendMessage(chatId, text);
  } catch (error) {
    await tgBot.sendMessage(chatId, 'Something went wrong...');
  }
};
