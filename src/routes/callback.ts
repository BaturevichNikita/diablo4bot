import { notificationsCommand } from '../commands/callback';
import { CallbackPaths, Command, Path } from '../types/routing';

export const CallbackRoutingMap = new Map<Path, Command>().set(CallbackPaths.NOTIFICATIONS, notificationsCommand);
