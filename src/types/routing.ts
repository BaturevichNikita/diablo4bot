type Command = (chatId: string) => Promise<void>;
export type Routes = {
  [key: string]: Command;
};
