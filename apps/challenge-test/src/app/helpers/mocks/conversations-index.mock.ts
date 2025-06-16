import { ConversationIndexItem } from '../../types';

export const conversationsIndexMock: ConversationIndexItem[] = [
  {
    client_id: '629a8125b2d313190810212f',
    client_name: 'Pedro Naranjo',
    conversation_id: 1,
    fileName: '1_629a8125b2d313190810212f.json',
  },
  {
    client_id: '629e39e8b2d31319081e0650',
    client_name: 'Diego O',
    conversation_id: 2,
    fileName: '2_629e39e8b2d31319081e0650.json',
  },
];

export const getConversationCountByClientId = (clientId: string) => {
  return conversationsIndexMock
    .filter((conversation) => conversation.client_id === clientId)
    .length;
};
