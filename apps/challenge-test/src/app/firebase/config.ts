// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBT-4Cn3A9M8Opw-Iec3_JlvR2ZCPBZuKk',
  authDomain: 'challenge-test-6404c.firebaseapp.com',
  projectId: 'challenge-test-6404c',
  storageBucket: 'challenge-test-6404c.appspot.com',
  messagingSenderId: '234826503701',
  appId: '1:234826503701:web:3d5694f0a8ce906459601c',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
