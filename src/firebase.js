import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBKolQnavWAGVKW1y8ta14Vr7L-0ibUsuc",
  authDomain: "my-ai-generator-4a4e9.firebaseapp.com",
  projectId: "my-ai-generator-4a4e9",
  storageBucket: "my-ai-generator-4a4e9.appspot.com",
  messagingSenderId: "900319651395",
  appId: "1:900319651395:web:f08c6833694664f87796f6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
