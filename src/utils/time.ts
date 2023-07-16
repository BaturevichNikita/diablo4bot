export const getCurrentTime = (): number => Math.floor(Date.now() / 1000);

export const getTimeUntilEvent = (expected: number, nextExpected: number) => {
  const currentTime = getCurrentTime();
  let timeDifference = expected - currentTime;

  if (timeDifference <= 0) {
    timeDifference = nextExpected - currentTime;
  }

  const hours = Math.floor((timeDifference / 3600) % 24);
  const minutes = Math.floor((timeDifference / 60) % 60);

  const times: string[] = [];

  if (hours > 0) {
    times.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
  }
  if (minutes > 0) {
    times.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
  }

  return times.length ? times.join(', ').trim() : 'less than minute';
};

export const getFutureTimestamp = (timestamp: number, hours: number, minutes: number) => {
  const futureDate = new Date(timestamp * 1000);
  futureDate.setHours(futureDate.getHours() + hours, futureDate.getMinutes() + minutes);
  return Math.floor(futureDate.getTime() / 1000);
};
