import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { SUBSCRIPTION_TABLE_NAME } from '../config';
import { SubscriptionRecord, UpdateSubscriptionsPayload } from '../types/dynamodb';

const client = new DynamoDBClient({ region: 'eu-north-1' });
const docClient = DynamoDBDocumentClient.from(client);

export const updateSubscription = async ({ chatId, eventType, event }: UpdateSubscriptionsPayload) => {
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

export const getSubscriptions = async (): Promise<SubscriptionRecord[]> => {
  const command = new ScanCommand({
    TableName: SUBSCRIPTION_TABLE_NAME!,
    FilterExpression: 'worldBoss = :worldBoss OR helltide = :helltide OR legion = :legion',
    ExpressionAttributeValues: {
      ':worldBoss': true,
      ':helltide': true,
      ':legion': true,
    },
    ConsistentRead: false,
  });

  const response = await docClient.send(command);
  console.log(`${response.Count} items were found for notify`);

  const resultItems = response.Items || [];
  return resultItems as SubscriptionRecord[];
};
