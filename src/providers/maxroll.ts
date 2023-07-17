import { EventProvider } from '.';
import { MaxrollHelltide, MaxrollResponse } from '../types/events/maxroll';
import { getMinutesText, getTimeUntilEvent } from '../utils/time';

export class MaxrollProvider extends EventProvider {
  private helltide: MaxrollHelltide;

  constructor({ worldboss, legion, helltide }: MaxrollResponse) {
    super({ worldBoss: worldboss, legion });
    this.helltide = helltide;
  }

  public getHelltideTimestamp() {
    return this.helltide.eventStartTimestamp;
  }

  public transformHelltide() {
    const { isActive, remainingTime, eventStartTimestamp } = this.helltide;

    if (isActive && remainingTime) {
      const { minutes } = remainingTime;
      const text = minutes > 0 ? getMinutesText(minutes) : 'less than minute';
      return `Helltide is active! Time remaining: ${text}.`;
    }
    return `Next Helltide in ${getTimeUntilEvent(eventStartTimestamp)}.`;
  }
}
