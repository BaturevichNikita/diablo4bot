export type Path = string;
export type Command = (chatId: string, text?: string) => Promise<void>;
