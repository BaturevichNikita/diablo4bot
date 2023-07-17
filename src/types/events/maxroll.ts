import { Legion, WorldBoss } from './common';

export type MaxrollHelltide = {
  eventStart: string;
  eventStartTimestamp: number;
  timeUntilNext: {
    minutes: number;
    seconds: number;
  };
  remainingTime?: {
    minutes: number;
    seconds: number;
  };
  isActive: boolean;
  coordinates: {
    x: number;
    y: number;
    zone: string;
  };
};

export type MaxrollResponse = {
  helltide: MaxrollHelltide;
  worldboss: WorldBoss;
  legion: Legion;
};
