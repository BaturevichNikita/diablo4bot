import { echoCommand } from '../../commands/echo';
import { scheduleCommand } from '../../commands/schedule';
import { Command, Path } from '../../types/routing';

export enum Paths {
  SCHEDULE = '/schedule',
  ECHO = '/echo',
}

export const RoutingMap = new Map<Path, Command>().set(Paths.SCHEDULE, scheduleCommand).set(Paths.ECHO, echoCommand);
