import { ConversationIndexItem } from '../../types';

const conversations: ConversationIndexItem[] = [
  {
    client_id: '629a8125b2d313190810212f',
    client_name: 'Pedro Naranjo',
    conversation_id: 1,
    fileName: '1_629a8125b2d313190810212f.json',
    totalMessages: 0,
    createdAt: '2022-07-06T22:58:30.457Z',
  },
  {
    client_id: '629e39e8b2d31319081e0650',
    client_name: 'Diego O',
    conversation_id: 2,
    fileName: '2_629e39e8b2d31319081e0650.json',
    totalMessages: 0,
    createdAt: '2022-06-07T16:37:04.169Z',
  },
];

export const conversationsIndexMock: ConversationIndexItem[] = conversations;

export const getConversationsWithMessageCount = async (): Promise<ConversationIndexItem[]> => {
  const results = await Promise.all(
    conversations.map(async (conversation) => {
      try {
        const response = await fetch(`assets/conversations/${conversation.fileName}`);
        const data = await response.json();
        const totalMessages = Array.isArray(data?.messages)
          ? data.messages.length
          : 0;

        return {
          ...conversation,
          totalMessages,
        };
      } catch (err) {
        console.error(`Failed to fetch ${conversation.fileName}`, err);
        return {
          ...conversation,
          totalMessages: 0,
        };
      }
    })
  );

  return results;
};

export const getConversationCountByClientId = (clientId: string): number => {
  return conversations.filter(
    (conversation: ConversationIndexItem) => conversation.client_id === clientId
  ).length;
};
