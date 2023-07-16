import { MessageRoutingMap } from '../routes';
import { MessagePaths } from '../types/routing';
import { Message } from '../types/telegram';

export const messageProcessor = async (message: Message) => {
  const {
    text,
    chat: { id },
  } = message;

  const command = MessageRoutingMap.get(text.trim()) || MessageRoutingMap.get(MessagePaths.ECHO);
  if (!command) {
    throw new Error('No command is associated with the specified path.');
  }

  await command(id, text);
};
