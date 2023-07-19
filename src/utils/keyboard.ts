import { CallbackPaths, NotificationEvents, NotificationStatus } from '../types/routing';

export const notificationKeyboard = () => ({
  inline_keyboard: [
    [
      {
        text: 'World Boss turn on',
        callback_data: `${CallbackPaths.NOTIFICATIONS}-${NotificationEvents.WORLD_BOSS}-${NotificationStatus.TURN_ON}`,
      },
      {
        text: 'World Boss turn off',
        callback_data: `${CallbackPaths.NOTIFICATIONS}-${NotificationEvents.WORLD_BOSS}-${NotificationStatus.TURN_OFF}`,
      },
    ],
    [
      {
        text: 'Helltide turn on',
        callback_data: `${CallbackPaths.NOTIFICATIONS}-${NotificationEvents.HELLTIDE}-${NotificationStatus.TURN_ON}`,
      },
      {
        text: 'Helltide turn off',
        callback_data: `${CallbackPaths.NOTIFICATIONS}-${NotificationEvents.HELLTIDE}-${NotificationStatus.TURN_OFF}`,
      },
    ],
    [
      {
        text: 'Legion turn on',
        callback_data: `${CallbackPaths.NOTIFICATIONS}-${NotificationEvents.LEGION}-${NotificationStatus.TURN_ON}`,
      },
      {
        text: 'Legion turn off',
        callback_data: `${CallbackPaths.NOTIFICATIONS}-${NotificationEvents.LEGION}-${NotificationStatus.TURN_OFF}`,
      },
    ],
  ],
});
