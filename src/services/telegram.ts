import { TOKEN } from '../config';
import { apiCall } from '../utils/api';
import { HttpMethods } from '../types/http';
import { Chat } from '../types/telegram';

class TgBot {
  private readonly baseUrl: string;
  constructor() {
    this.baseUrl = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
  }

  async sendMessage(chatId: Chat['id'], text: string, reply_markup?: string) {
    const payload = { text, chat_id: chatId, ...(reply_markup && { reply_markup }) };
    return apiCall(HttpMethods.POST, this.baseUrl, payload);
  }
}

export const tgBot = new TgBot();
