import { ConversationIndexItem } from '../types';
import { conversationsIndexMock } from './mocks/conversations-index.mock';

export const loadConversationsIndex = async (): Promise<ConversationIndexItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(conversationsIndexMock);
    }, 500); // Simulated 500ms delay
  });
};
