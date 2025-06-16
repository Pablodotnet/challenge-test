import { AppDispatch, store } from '../store';
import { loadClients } from '../../helpers';
import { setClients } from './clientsSlice';

export const startLoadingClients = () => {
  return async (dispatch: AppDispatch, getState: typeof store.getState) => {
    const clients = await loadClients();
    dispatch(setClients(clients));
  };
};
