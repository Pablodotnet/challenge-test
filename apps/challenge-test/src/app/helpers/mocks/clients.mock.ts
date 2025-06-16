import { Client } from '../../types';
import { getConversationCountByClientId } from './conversations-index.mock';

export const mockClients: Client[] = [
  {
    _id: '629a8125b2d313190810212f',
    name: 'Pedro Naranjo',
    createdAt: '1654292773900',
    updatedAt: '1657150137370',
    totalConversations: getConversationCountByClientId(
      '629a8125b2d313190810212f'
    ),
  },
  {
    _id: '629e39e8b2d31319081e0650',
    name: 'Diego O',
    createdAt: '1654617133986',
    updatedAt: '1659028266305',
    totalConversations: getConversationCountByClientId(
      '629e39e8b2d31319081e0650'
    ),
  },
];
