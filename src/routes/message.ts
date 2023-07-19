import { echoCommand, scheduleCommand, startCommand, notificationsCommand, statusCommand } from '../commands/message';
import { Command, MessagePaths, Path } from '../types/routing';

export const MessageRoutingMap = new Map<Path, Command>()
  .set(MessagePaths.START, startCommand)
  .set(MessagePaths.SCHEDULE, scheduleCommand)
  .set(MessagePaths.NOTIFICATIONS, notificationsCommand)
  .set(MessagePaths.STATUS, statusCommand)
  .set(MessagePaths.ECHO, echoCommand);
