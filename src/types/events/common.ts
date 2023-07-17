export type WorldBoss = {
  name: string;
  expectedName: string;
  nextExpectedName: string;
  timestamp: number;
  expected: number;
  nextExpected: number;
  territory: string;
  zone: string;
};

export type Legion = {
  timestamp: number;
  territory: string;
  zone: string;
  expected: number;
  nextExpected: number;
};
