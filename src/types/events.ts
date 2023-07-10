export type Boss = {
  name: string;
  expectedName: string;
  nextExpectedName: string;
  timestamp: number;
  expected: number;
  nextExpected: number;
  territory: string;
  zone: string;
};

export type Helltide = {
  timestamp: number;
  zone: string;
  refresh: number;
};

export type Legion = {
  timestamp: number;
  territory: string;
  zone: string;
  expected: number;
  nextExpected: number;
};

export type Events = {
  boss: Boss;
  helltide: Helltide;
  legion: Legion;
};
