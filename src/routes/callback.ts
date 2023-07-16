import { backCommand, subscribeCommand, unsubscribeCommand } from '../commands/callback';
import { CallbackPaths, Command, Path } from '../types/routing';

export const CallbackRoutingMap = new Map<Path, Command>()
  .set(CallbackPaths.BACK, backCommand)
  .set(CallbackPaths.SUBSCRIBE, subscribeCommand)
  .set(CallbackPaths.UNSUBSCRIBE, unsubscribeCommand);
