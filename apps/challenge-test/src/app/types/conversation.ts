export type ConversationIndexItem = {
  client_id: string;
  client_name: string;
  conversation_id: number;
  fileName: string;
  totalMessages: number;
  createdAt: string;
};

export type Conversation = {
  messages: Message[];
}

export type Message = {
  client?: string;
  message: {
    text: string;
    user: string;
    typeUser: 'Client' | 'UserSystem';
  };
  createdAt?: string;
};
