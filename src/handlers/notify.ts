import { getSubscriptions } from '../services/dynamodb';
import { Schedule, getSchedule } from '../services/events';
import { tgBot } from '../services/telegram';
import { shouldNotify } from '../utils/notifier';
import { makeResponse } from '../utils/response';

export const handler = async () => {
  try {
    const [subscriptions, schedule] = await Promise.all([getSubscriptions(), getSchedule()]);

    const filteredEvents = schedule.filter(({ event, timestamp }) => shouldNotify(event, timestamp));

    const notifyPromises = subscriptions.reduce<Promise<any>[]>(
      (acc, { chatId, eventType, helltide, legion, worldBoss }) => {
        const userNotifications: Schedule[] = [];
        if (helltide) {
          const helltideEvent = filteredEvents.find(({ event }) => event === 'helltide');
          if (helltideEvent) {
            userNotifications.push(helltideEvent);
          }
        }

        if (legion) {
          const legionEvent = filteredEvents.find(({ event }) => event === 'legion');
          if (legionEvent) {
            userNotifications.push(legionEvent);
          }
        }

        if (worldBoss) {
          const worldBossEvent = filteredEvents.find(({ event }) => event === 'worldBoss');
          if (worldBossEvent) {
            userNotifications.push(worldBossEvent);
          }
        }

        const text = userNotifications.map(({ text }) => text).join('\n');

        console.log({ chatId, text });

        if (text) {
          acc.push(tgBot.sendMessage(chatId, `Event type = ${eventType}\n${text}`));
        }
        return acc;
      },
      []
    );

    await Promise.all(notifyPromises);

    return makeResponse({ status: 'Success' });
  } catch (error) {
    console.error(error);
    return makeResponse({ status: 'Error' }, 400);
  }
};
