import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand, ScanCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
import { NOTIFICATIONS_TABLE_NAME } from '../config';
import { GetNotificationPayload, NotificationRecord, UpdateNotificationsPayload } from '../types/dynamodb';

const client = new DynamoDBClient({ region: 'eu-north-1' });
const docClient = DynamoDBDocumentClient.from(client);

export const updateNotifications = async ({ chatId, event }: UpdateNotificationsPayload) => {
  const ExpressionAttributeValues = {
    [`:${event.key}`]: event.value,
  };
  const UpdateExpression = `SET ${event.key} = :${event.key}`;

  const command = new UpdateCommand({
    TableName: NOTIFICATIONS_TABLE_NAME!,
    Key: { chatId },
    ExpressionAttributeValues,
    UpdateExpression,
    ReturnValues: 'NONE',
    ReturnConsumedCapacity: 'TOTAL',
  });

  console.info(command, 'Update item comand');

  const response = await docClient.send(command);
  console.log(response.ConsumedCapacity, `DynamoDb updateNotifications consumed capacity`);
};

export const getNotification = async ({ chatId }: GetNotificationPayload): Promise<NotificationRecord> => {
  const command = new GetCommand({
    TableName: NOTIFICATIONS_TABLE_NAME!,
    Key: { chatId },
    ReturnConsumedCapacity: 'TOTAL',
  });
  const response = await docClient.send(command);
  console.log(response.ConsumedCapacity, `DynamoDb getNotification consumed capacity`);
  return response.Item as NotificationRecord;
};

export const getNotifications = async (): Promise<NotificationRecord[]> => {
  const command = new ScanCommand({
    TableName: NOTIFICATIONS_TABLE_NAME!,
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
  console.log(response.ConsumedCapacity, `DynamoDb getNotifications consumed capacity`);
  return (response.Items || []) as NotificationRecord[];
};
