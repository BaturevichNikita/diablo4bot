export type TgBody = {
  message: {
    text: string;
    chat: {
      id: string;
    };
  };
};
