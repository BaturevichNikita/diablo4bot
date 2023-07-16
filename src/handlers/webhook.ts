import { Handler, APIGatewayEvent } from 'aws-lambda';
import { TgBody } from '../types/telegram';
import { makeResponse } from '../utils/response';
import { callbackProcessor, messageProcessor } from '../processors';

export const handler: Handler = async (event: APIGatewayEvent) => {
  try {
    if (!event.body) throw new Error('Invalid payload!');

    const body = JSON.parse(event.body) as TgBody;

    console.log(JSON.stringify({ body }, null, 2));

    if (body.callback_query) {
      await callbackProcessor(body.callback_query);
      return makeResponse(event);
    }

    if (body.message) {
      await messageProcessor(body.message);
    }

    return makeResponse(event);
  } catch (error) {
    console.error(error);
    return makeResponse(event, 400);
  }
};
