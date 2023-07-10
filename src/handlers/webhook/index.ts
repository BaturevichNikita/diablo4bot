import { Handler, APIGatewayEvent } from 'aws-lambda';
import { tgBot } from '../../services/telegram';
import { TgBody } from '../../types/telegram';
import { makeResponse } from '../../utils/response';
import { routes } from './routing';

export const handler: Handler = async (event: APIGatewayEvent) => {
  try {
    if (!event.body) throw new Error('Invalid payload!');

    const body = JSON.parse(event.body) as TgBody;
    const {
      text,
      chat: { id },
    } = body.message;

    const route = Object.keys(routes).find((route) => text.startsWith(route));
    const command = route && routes[route];

    if (!command) {
      await tgBot.sendMessage(id, `You sent: ${text}`);
    } else {
      await command(id);
    }

    return makeResponse(event);
  } catch (error) {
    console.error(error);
    return makeResponse(event, 400);
  }
};
