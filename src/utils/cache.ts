export enum CacheKeys {
  DB_SUBSCRIPTIONS = 'subscriptions',
  EVENTS = 'events',
}

const cache = new Map();

export const hasCache = (key: string) => cache.has(key);

export const getCache = (key: string) => {
  let result: any;
  if (hasCache(key)) {
    result = cache.get(key);
    console.log(result, `Got ${key} from cache`);
  }
  return result;
};

export const setCache = (key: string, value: any) => {
  cache.set(key, value);
  console.log(value, `Add ${key} into cache.`);
};

export const deleteCache = (key: string) => cache.delete(key);
