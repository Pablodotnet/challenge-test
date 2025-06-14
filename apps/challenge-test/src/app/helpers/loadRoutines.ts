import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';
import { Routine } from '../types';

export const loadRoutines = async (uid: string) => {
  if (!uid) {
    throw new Error('The User UID is not defined.');
  }
  const collectionRef = collection(FirebaseDB, `${uid}/routines/routine`);
  const docs = await getDocs(collectionRef);
  const routines: Routine[] = [];
  docs.forEach((doc) => {
    routines.push({ id: doc.id, ...doc.data() } as Routine);
  });
  console.log('routines: ', routines);
  return routines;
};
