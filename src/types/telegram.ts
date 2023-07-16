export type Chat = {
  id: number;
  first_name: string;
  username: string;
  type: string;
};

type From = {
  id: number;
  is_bot: boolean;
  first_name: string;
  username: string;
  language_code: string;
};

export type Message = {
  message_id: number;
  from: From;
  chat: Chat;
  date: number;
  text: string;
};

export type CallbackQuery = {
  id: string;
  from: From;
  message: Message;
  data: string;
};

export type TgBody = {
  update_id: number;
  callback_query?: CallbackQuery;
  message?: Message;
};
