import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '.';
import { FirebaseAuth } from '../firebase/config';
import { logout, login } from '../store';
import { startLoadingClients } from '../store/clients';
import { startLoadingConversations } from '../store/conversations';

export const useCheckAuth = () => {
  const { status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) {
        return dispatch(logout({}));
      }
      const { uid, email, displayName, photoURL } = user;
      dispatch(login({ uid, email, displayName, photoURL }));
      dispatch(startLoadingClients());
      dispatch(startLoadingConversations());
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { status };
};
