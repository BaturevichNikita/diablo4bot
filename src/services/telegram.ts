import { TOKEN } from '../config';
import { apiCall } from '../integration/api';
import { HttpMethods } from '../types/http';

class TgBot {
  private readonly baseUrl: string;
  constructor() {
    this.baseUrl = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
  }

  async sendMessage(chatId: string, text: string) {
    return apiCall(HttpMethods.POST, this.baseUrl, JSON.stringify({ text, chat_id: chatId }));
  }
}

export const tgBot = new TgBot();
