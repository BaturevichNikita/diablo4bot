import { Legion, WorldBoss } from '../types/events/common';
import { getTimeUntilEvent } from '../utils/time';

export abstract class EventProvider {
  private legion: Legion;
  private worldBoss: WorldBoss;

  constructor({ worldBoss, legion }) {
    this.worldBoss = worldBoss;
    this.legion = legion;
  }

  public getHelltideTimestamp() {
    throw new Error('getHelltideTimestamp method is not implemented!');
  }

  public transformHelltide() {
    throw new Error('transformHelltide method is not implemented!');
  }

  public getWorldBossTimestamp() {
    return this.worldBoss.timestamp;
  }

  public getLegionTimestamp() {
    return this.legion.expected;
  }

  public transformWorldboss() {
    const { expectedName, expected, nextExpected, nextExpectedName } = this.worldBoss;
    let time = getTimeUntilEvent(expected);
    let name = expectedName;

    if (!time) {
      time = getTimeUntilEvent(nextExpected);
      name = nextExpectedName;
    }

    return `Next World Boss: ${name} in ${time}.`;
  }

  public transformLegion() {
    const { expected, nextExpected } = this.legion;
    const time = getTimeUntilEvent(expected) ?? getTimeUntilEvent(nextExpected);
    return `Next legion in ${time}.`;
  }
}
