import { getEvents } from '../../services/events';
import { tgBot } from '../../services/telegram';
import { Boss, Helltide, Legion } from '../../types/events';
import { getFutureTimestamp, getTimeUntilEvent } from '../../utils/time';

const getWorldBoss = ({ expectedName, expected, nextExpected }: Boss) =>
  `Next World Boss: ${expectedName} in ${getTimeUntilEvent(expected, nextExpected)}.`;

const getLegion = ({ expected, nextExpected }: Legion) =>
  `Next legion in ${getTimeUntilEvent(expected, nextExpected)}.`;

const getHelltide = ({ timestamp }: Helltide) => {
  const now = Date.now();
  const active = getFutureTimestamp(timestamp, 1, 0);
  const timeDifference = active * 1000 - now;

  return timeDifference <= 0
    ? `Next Helltide in ${getTimeUntilEvent(timestamp, getFutureTimestamp(timestamp, 2, 15))}.`
    : `Helltide is active! Time remaining: ${getTimeUntilEvent(active, active)}.`;
};

export const scheduleCommand = async (chatId: string) => {
  try {
    const { data: events } = await getEvents();
    const { boss, helltide, legion } = events;

    const nextWorldBoss = getWorldBoss(boss);
    const nextLegion = getLegion(legion);
    const nextHelltide = getHelltide(helltide);

    const text = [nextWorldBoss, nextLegion, nextHelltide].join('\n');
    await tgBot.sendMessage(chatId, text);
  } catch (error) {
    await tgBot.sendMessage(chatId, 'Something went wrong...');
  }
};
