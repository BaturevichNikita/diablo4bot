import { CallbackPaths } from '../types/routing';

export const getReplyMarkup = (callbackType: CallbackPaths) => ({
  inline_keyboard: [
    [{ text: 'World Boss', callback_data: `${callbackType}-world_boss` }],
    [{ text: 'Helltide', callback_data: `${callbackType}-helltide` }],
    [{ text: 'Legion', callback_data: `${callbackType}-legion` }],
    [{ text: 'Back', callback_data: 'back' }],
  ],
});
