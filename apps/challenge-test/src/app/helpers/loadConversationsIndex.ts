import { ConversationIndexItem } from '../types';
import { conversationsIndexMock } from './mocks/conversations-index.mock';
import { sleep } from './utils';

export const loadConversationsIndex = async (): Promise<
  ConversationIndexItem[]
> => {
  return new Promise((resolve) => {
    sleep(1000).then(() => {
      resolve(conversationsIndexMock);
    });
  });
};
