import { getSubscription } from '../../services/dynamodb';
import { tgBot } from '../../services/telegram';
import { Command } from '../../types/routing';

// const enabledIcon = '✅';
// const disabledIcon = '❌';
const notificationPreffix = 'notifications are';
const botRules =
  '❗️The bot does not send notifications between 00:00 - 09:00 (Europe/Minsk UTC+3). Even if they are enabled.❗️';

const notificationFrequency = {
  once: 'The bot will notify you once: 5-10 minutes before the start of the event.',
  twice: 'The bot will notify you twice: 10-15 minutes and 5-10 minutes before the start of the event.',
};

const getTextStatus = (status?: boolean, frequency = notificationFrequency.once) =>
  status ? `enabled.\n${frequency}\n` : 'disabled.\n';

export const statusCommand: Command = async (chatId) => {
  try {
    const subscription = await getSubscription({ chatId, eventType: 'non-season' });

    const worldBossStatus = getTextStatus(subscription?.worldBoss, notificationFrequency.twice);
    const helltideStatus = getTextStatus(subscription?.helltide);
    const legionStatus = getTextStatus(subscription?.legion);

    const worldBossFinalText = `World Boss: ${notificationPreffix} ${worldBossStatus}`;
    const helltideFinalText = `Helltide: ${notificationPreffix} ${helltideStatus}`;
    const legionFinalText = `Legion: ${notificationPreffix} ${legionStatus}`;

    const status = [worldBossFinalText, helltideFinalText, legionFinalText, botRules].join('\n');

    await tgBot.sendMessage(chatId, status);
  } catch (error) {
    await tgBot.sendMessage(chatId, 'Something went wrong...');
  }
};
