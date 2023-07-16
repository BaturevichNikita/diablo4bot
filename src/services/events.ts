import { apiCall } from '../integration/api';
import { Boss, Events, Helltide, Legion } from '../types/events';
import { HttpMethods } from '../types/http';
import { getCurrentTime, getFutureTimestamp, getTimeUntilEvent } from '../utils/time';

export type Schedule = {
  event: string;
  text: string;
  timestamp: number;
};

const getEvents = async () => apiCall<Events>(HttpMethods.GET, 'https://d4armory.io/api/events/recent');

const getWorldBoss = ({ expectedName, expected, nextExpected }: Boss) =>
  `Next World Boss: ${expectedName} in ${getTimeUntilEvent(expected, nextExpected)}.`;

const getLegion = ({ expected, nextExpected }: Legion) =>
  `Next legion in ${getTimeUntilEvent(expected, nextExpected)}.`;

const getHelltide = ({ timestamp }: Helltide) => {
  const currentTime = getCurrentTime();
  const active = getFutureTimestamp(timestamp, 1, 0);
  const timeDifference = active - currentTime;

  return timeDifference <= 0
    ? `Next Helltide in ${getTimeUntilEvent(timestamp, getFutureTimestamp(timestamp, 2, 15))}.`
    : `Helltide is active! Time remaining: ${getTimeUntilEvent(active, active)}.`;
};

export const getSchedule = async (): Promise<Schedule[]> => {
  const { data: events } = await getEvents();
  const { boss, helltide, legion } = events;

  return [
    { event: 'worldBoss', timestamp: boss.expected, text: getWorldBoss(boss) },
    { event: 'helltide', timestamp: helltide.timestamp, text: getHelltide(helltide) },
    { event: 'legion', timestamp: legion.expected, text: getLegion(legion) },
  ];
};
