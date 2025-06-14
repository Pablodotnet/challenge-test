import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { AppDispatch, store } from '../store';
import { FirebaseDB } from '../../firebase/config';
import { Routine } from '../../types';
import {
  addNewEmptyRoutine,
  savingNewRoutine,
  setActiveRoutine,
  setRoutines,
} from './routineSlice';
import { loadRoutines } from '../../helpers';

export const startNewRoutine = () => {
  return async (dispatch: AppDispatch, getState: typeof store.getState) => {
    dispatch(savingNewRoutine());
    const { uid } = getState().auth;
    const newRoutine: Routine = {
      title: '',
      description: '',
      date: new Date().getTime(),
    };
    const newDoc = doc(collection(FirebaseDB, `${uid}/routines/routine`));
    await setDoc(newDoc, newRoutine);
    newRoutine.id = newDoc.id;
    dispatch(addNewEmptyRoutine(newRoutine));
    dispatch(setActiveRoutine(newRoutine));
  };
};

export const startLoadingRoutines = () => {
  return async (dispatch: AppDispatch, getState: typeof store.getState) => {
    const { uid } = getState().auth;
    if (!uid) {
      throw new Error('The User UID is not defined.');
    }
    console.log({ uid });
    const routines = await loadRoutines(uid);
    dispatch(setRoutines(routines));
  };
};
