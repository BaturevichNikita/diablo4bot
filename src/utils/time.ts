export const getTimeUntilEvent = (expected: number, nextExpected: number) => {
  const now = Date.now();
  let timeDifference = expected * 1000 - now;

  if (timeDifference <= 0) {
    timeDifference = nextExpected * 1000 - now;
  }

  const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);

  const times: string[] = [];

  if (hours > 0) {
    times.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
  }
  if (minutes > 0) {
    times.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
  }

  return times.join(', ').trim();
};

export const getFutureTimestamp = (timestamp: number, hours: number, minutes: number) => {
  const futureDate = new Date(timestamp * 1000);
  futureDate.setHours(futureDate.getHours() + hours, futureDate.getMinutes() + minutes);
  return futureDate.getTime() / 1000;
};
