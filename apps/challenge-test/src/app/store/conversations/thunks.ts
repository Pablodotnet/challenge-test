import { loadConversationsIndex } from '../../helpers';
import { AppDispatch, store } from '../store';
import { setConversationsIndex } from './conversationsSlice';

export const startLoadingConversations = () => {
  return async (dispatch: AppDispatch, getState: typeof store.getState) => {
    const conversations = await loadConversationsIndex();
    dispatch(setConversationsIndex(conversations));
  };
};
