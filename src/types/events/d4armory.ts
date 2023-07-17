import { Legion, WorldBoss } from './common';

export type D4ArmoryHelltide = {
  timestamp: number;
  zone: string;
  refresh: number;
};

export type D4ArmoryResponse = {
  helltide: D4ArmoryHelltide;
  boss: WorldBoss;
  legion: Legion;
};
