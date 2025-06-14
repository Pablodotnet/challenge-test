import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '.';
import { FirebaseAuth } from '../firebase/config';
import { logout, login } from '../store';
import { startLoadingRoutines } from '../store/routines';

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
      dispatch(startLoadingRoutines());
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { status };
};
