import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand, ScanCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
import { SUBSCRIPTION_TABLE_NAME } from '../config';
import { GetSubscriptionPayload, SubscriptionRecord, UpdateSubscriptionsPayload } from '../types/dynamodb';

const client = new DynamoDBClient({ region: 'eu-north-1' });
const docClient = DynamoDBDocumentClient.from(client);

export const updateSubscription = async ({ chatId, eventType, event }: UpdateSubscriptionsPayload) => {
  const ExpressionAttributeValues = {
    [`:${event.key}`]: event.value,
  };
  const UpdateExpression = `SET ${event.key} = :${event.key}`;

  const command = new UpdateCommand({
    TableName: SUBSCRIPTION_TABLE_NAME!,
    Key: { chatId, eventType },
    ExpressionAttributeValues,
    UpdateExpression,
    ReturnValues: 'NONE',
    ReturnConsumedCapacity: 'TOTAL',
  });

  console.info(command, 'Update item comand');

  const response = await docClient.send(command);
  console.log(response.ConsumedCapacity, `DynamoDb updateSubscription consumed capacity`);
};

export const getSubscription = async ({ chatId, eventType }: GetSubscriptionPayload): Promise<SubscriptionRecord> => {
  const command = new GetCommand({
    TableName: SUBSCRIPTION_TABLE_NAME!,
    Key: { chatId, eventType },
    ReturnConsumedCapacity: 'TOTAL',
  });
  const response = await docClient.send(command);
  console.log(response.ConsumedCapacity, `DynamoDb getSubscription consumed capacity`);
  return response.Item as SubscriptionRecord;
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
    ReturnConsumedCapacity: 'TOTAL',
  });

  const response = await docClient.send(command);
  console.log(response.ConsumedCapacity, `DynamoDb getSubscriptions consumed capacity`);
  return (response.Items || []) as SubscriptionRecord[];
};
