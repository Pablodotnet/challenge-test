import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { FirebaseAuth, FirebaseDB } from './config';
import { LoginParams, RegisterParams } from '../types';
import { doc, getDoc, setDoc } from 'firebase/firestore/lite';

const googleProvider = new GoogleAuthProvider();

export const getCurrentUser = () => {
  return FirebaseAuth.currentUser;
};

export const isClientFirestoreUser = async (uid: string) => {
  const userRef = doc(FirebaseDB, 'users', uid);
  const userSnap = await getDoc(userRef);
  return userSnap.exists();
};

export const getUserById = async (uid: string) => {
  const userRef = doc(FirebaseDB, 'users', uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const data = userSnap.data();
    return {
      uid: userSnap.id,
      email: data.email,
      displayName: data.displayName || null,
      photoURL: data.photoURL || null,
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : null,
    };
  } else {
    console.error(`User with ID ${uid} does not exist in Firestore.`);
    return null;
  }
};

export const registerUserInFirestore = async () => {
  const user = FirebaseAuth.currentUser;
  if (!user) return;

  const userRef = doc(FirebaseDB, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      createdAt: new Date(),
    });
    console.log(`New user document created: ${user.uid}`);
  } else {
    console.log(`User already exists in Firestore: ${user.uid}`);
  }
}

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    const { displayName, email, photoURL, uid } = result.user;
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errorMessage = error.message;
    return {
      ok: false,
      errorMessage,
    };
  }
};

export const registerUserWithEmailPassword = async ({
  email,
  password,
  displayName,
}: RegisterParams) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL } = resp.user;
    await updateProfile(FirebaseAuth.currentUser as User, {
      displayName,
      photoURL,
    });
    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { ok: false, errorMessage: error.message };
  }
};

type LoginWithEmailPasswordResponse = {
  ok: boolean;
  uid?: string;
  photoURL?: string | null;
  email?: string;
  displayName?: string | null;
  errorMessage?: string | undefined;
};

export const loginWithEmailAndPassword = async ({
  email,
  password,
}: LoginParams): Promise<LoginWithEmailPasswordResponse> => {
  try {
    const resp = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL, displayName } = resp.user;
    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { ok: false, errorMessage: error.message };
  }
};

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
};
