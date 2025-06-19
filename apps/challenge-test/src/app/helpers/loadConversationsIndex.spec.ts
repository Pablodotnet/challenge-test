import { loadConversationsIndex } from './';
import { conversationsIndexMock } from './mocks/conversations-index.mock';

describe('loadConversationsIndex', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return the mock conversations index', async () => {
    const result = await loadConversationsIndex();
    expect(result).toEqual(conversationsIndexMock);
  });
});
