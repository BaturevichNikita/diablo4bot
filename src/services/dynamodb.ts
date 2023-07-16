import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { SUBSCRIPTION_TABLE_NAME } from '../config';
import { Chat } from '../types/telegram';

type SubscriptionPayload = {
  chatId: Chat['id'];
  eventType: 'non-season' | 'season';
  event: {
    key: string;
    value: boolean;
  };
};
const client = new DynamoDBClient({ region: 'eu-north-1' });
const docClient = DynamoDBDocumentClient.from(client);

export const updateItem = async ({ chatId, eventType, event }: SubscriptionPayload) => {
  const ExpressionAttributeValues = {
    [`:${event.key}`]: event.value,
  };
  const UpdateExpression = `SET ${event.key} = :${event.key}`;

  const params = {
    TableName: SUBSCRIPTION_TABLE_NAME!,
    Key: { chatId, eventType },
    ExpressionAttributeValues,
    UpdateExpression,
    ReturnValues: 'NONE',
  };

  console.info({ params }, 'Update item params');

  const command = new UpdateCommand(params);
  return docClient.send(command);
};
