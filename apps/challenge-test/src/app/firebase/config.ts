// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCmFWPUpoJkjj0z-p4D1ilSBNHivoKG5Xo',
  authDomain: 'challenge-test-62b80.firebaseapp.com',
  projectId: 'challenge-test-62b80',
  storageBucket: 'challenge-test-62b80.firebasestorage.app',
  messagingSenderId: '565977897958',
  appId: '1:565977897958:web:8d91e3f8a183129d5b1427',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
