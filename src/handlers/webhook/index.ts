import { Handler, APIGatewayEvent } from 'aws-lambda';
import { TgBody } from '../../types/telegram';
import { makeResponse } from '../../utils/response';
import { Paths, RoutingMap } from './routing';

export const handler: Handler = async (event: APIGatewayEvent) => {
  try {
    if (!event.body) throw new Error('Invalid payload!');

    const body = JSON.parse(event.body) as TgBody;
    const {
      text,
      chat: { id },
    } = body.message;

    const command = RoutingMap.get(text.trim()) || RoutingMap.get(Paths.ECHO);
    if (!command) {
      throw new Error('No command is associated with the specified path.');
    }

    await command(id, text);

    return makeResponse(event);
  } catch (error) {
    console.error(error);
    return makeResponse(event, 400);
  }
};
