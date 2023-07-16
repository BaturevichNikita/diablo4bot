import { getCurrentTime } from './time';

export enum Time {
  MIN_2 = 120,
  MIN_5 = 300,
  MIN_6 = 360,
  MIN_10 = 600,
  MIN_15 = 900,
}

type NotifyConfig = {
  [key: string]: {
    lessThan: number;
    moreThan: number;
  }[];
};

const commonNotifyConfig: NotifyConfig = {
  worldBoss: [
    { lessThan: Time.MIN_15, moreThan: Time.MIN_10 },
    { lessThan: Time.MIN_10, moreThan: Time.MIN_5 },
  ],
  helltide: [{ lessThan: Time.MIN_10, moreThan: Time.MIN_5 }],
  legion: [{ lessThan: Time.MIN_10, moreThan: Time.MIN_5 }],
};

export const shouldNotify = (event: string, timestamp: number) => {
  const currentTime = getCurrentTime();
  const timeDiff = timestamp - currentTime;
  const config = commonNotifyConfig[event];
  return config.some(({ lessThan, moreThan }) => timeDiff <= lessThan && timeDiff >= moreThan);
};
