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
import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  query,
  where,
} from 'firebase/firestore';

const googleProvider = new GoogleAuthProvider();

export const getCurrentUser = () => {
  return FirebaseAuth.currentUser;
};

export const isClientFirestoreUser = async (uid: string) => {
  const userRef = doc(FirebaseDB, 'users', uid);
  const userSnap = await getDoc(userRef);
  return userSnap.exists();
};

export const getChatById = async (chatId: string) => {
  const chatRef = doc(FirebaseDB, 'chats', chatId);
  const chatSnap = await getDoc(chatRef);
  if (chatSnap.exists()) {
    const data = chatSnap.data();
    return {
      id: chatSnap.id,
      users: data.users || [],
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : null,
    };
  } else {
    console.error(`El chat con ID ${chatId} no está registrado en Firestore.`);
    return null;
  }
};

export const getChatsWithClient = async (uid: string) => {
  const currentUser = FirebaseAuth.currentUser;
  if (!currentUser) return [];

  const chatsRef = collection(FirebaseDB, 'chats');
  const q = query(chatsRef, where('participants', 'array-contains', uid));
  const chatsSnap = await getDocs(q);

  const chats: { id: string; participants: string[]; createdAt: string }[] = [];

  chatsSnap.forEach((doc) => {
    const data = doc.data();
    const participants: string[] = data.participants || [];
    const createdAt: string = new Date(data.createdAt).toLocaleDateString();

    if (participants.includes(currentUser.uid)) {
      chats.push({
        id: doc.id,
        createdAt,
        participants,
      });
    }
  });

  return chats;
};

export const getUsers = async () => {
  const usersRef = collection(FirebaseDB, 'users');
  const usersSnap = await getDocs(usersRef);
  const users: { uid: string; email: string; displayName: string | null }[] =
    [];
  usersSnap.forEach((doc) => {
    const data = doc.data();
    users.push({
      uid: doc.id,
      email: data.email,
      displayName: data.displayName || null,
    });
  });
  return users;
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
    console.error(`Usuario con ID ${uid} no está registrado en Firestore.`);
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
    console.log(`Nuevo usuario creado: ${user.uid}`);
  } else {
    console.log(`El usuario ya existe en Firestore: ${user.uid}`);
  }
};

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
