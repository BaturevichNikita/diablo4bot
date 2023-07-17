import { apiCall } from '../utils/api';
import { HttpMethods } from '../types/http';
import { CacheKeys, getCache, setCache } from '../utils/cache';
import { D4ArmoryResponse } from '../types/events/d4armory';
import { MaxrollResponse } from '../types/events/maxroll';
import { D4ArmoryProvider } from '../providers/d4armory';
import { MaxrollProvider } from '../providers/maxroll';

enum ProviderUrl {
  D4_ARMORY = 'https://d4armory.io/api/events/recent',
  MAXROLL = 'https://planners.maxroll.gg/d4/events',
}

type Provider = D4ArmoryProvider | MaxrollProvider;

export type Schedule = {
  event: string;
  text: string;
  timestamp: number;
};

const initProviderInstance = async (url: ProviderUrl) => {
  const { data } = await apiCall(HttpMethods.GET, url);
  return ProviderUrl.D4_ARMORY === url
    ? new D4ArmoryProvider(data as D4ArmoryResponse)
    : new MaxrollProvider(data as MaxrollResponse);
};

const getProviderInstance = async (): Promise<Provider> => {
  let provider: Provider;
  try {
    const providerInstance = await Promise.any([
      initProviderInstance(ProviderUrl.D4_ARMORY),
      initProviderInstance(ProviderUrl.MAXROLL),
    ]);
    setCache(CacheKeys.EVENTS, providerInstance);
    provider = providerInstance;
  } catch (err) {
    console.warn(err.message);
    provider = getCache(CacheKeys.EVENTS);
  }
  return provider;
};

export const getSchedule = async (): Promise<Schedule[]> => {
  const provider = await getProviderInstance();
  if (!provider) return [];

  return [
    { event: 'worldBoss', timestamp: provider.getWorldBossTimestamp(), text: provider.transformWorldboss() },
    { event: 'helltide', timestamp: provider.getHelltideTimestamp(), text: provider.transformHelltide() },
    { event: 'legion', timestamp: provider.getLegionTimestamp(), text: provider.transformLegion() },
  ];
};
