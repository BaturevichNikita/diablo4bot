import { EventProvider } from '.';
import { D4ArmoryHelltide, D4ArmoryResponse } from '../types/events/d4armory';
import { getCurrentTime, getFutureTimestamp, getTimeUntilEvent } from '../utils/time';

export class D4ArmoryProvider extends EventProvider {
  private helltide: D4ArmoryHelltide;

  constructor({ boss, legion, helltide }: D4ArmoryResponse) {
    super({ worldBoss: boss, legion });
    this.helltide = helltide;
  }

  public getHelltideTimestamp() {
    return this.helltide.timestamp;
  }

  public transformHelltide() {
    const { timestamp } = this.helltide;
    const currentTime = getCurrentTime();
    const active = getFutureTimestamp(timestamp, 1, 0);
    const timeDifference = active - currentTime;

    if (timeDifference > 0) {
      return `Helltide is active! Time remaining: ${getTimeUntilEvent(active)}.`;
    }

    const text = getTimeUntilEvent(timestamp) ?? getTimeUntilEvent(getFutureTimestamp(timestamp, 2, 15));
    return `Next Helltide in ${text}.`;
  }
}
