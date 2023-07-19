import { CallbackRoutingMap } from '../routes';
import { CallbackQuery } from '../types/telegram';

export const callbackProcessor = async (callbackQuery: CallbackQuery) => {
  const {
    data,
    message: {
      chat: { id },
    },
  } = callbackQuery;

  const [path, event, status] = data.split('-');

  const command = CallbackRoutingMap.get(path);
  if (!command) {
    throw new Error('No command is associated with the specified callback path.');
  }

  await command(id, `${event}-${status}`);
};
