import { echoCommand, scheduleCommand, subscribeCommand, unsubscribeCommand } from '../commands/message';
import { Command, MessagePaths, Path } from '../types/routing';

export const MessageRoutingMap = new Map<Path, Command>()
  .set(MessagePaths.ECHO, echoCommand)
  .set(MessagePaths.SCHEDULE, scheduleCommand)
  .set(MessagePaths.SUBSCRIBE, subscribeCommand)
  .set(MessagePaths.UNSUBSCRIBE, unsubscribeCommand);
