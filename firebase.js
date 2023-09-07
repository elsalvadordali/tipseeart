import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBFFaPAZ6GSZpEDrFOwa4REICl4otOGJEQ',
  authDomain: 'artist-profiles-934.firebaseapp.com',
  projectId: 'artist-profiles-934',
  storageBucket: 'artist-profiles-934.appspot.com',
  messagingSenderId: '742036551449',
  appId: '1:742036551449:web:456802a622a9a368577788',
  storageBucket: 'gs://artist-profiles-934.appspot.com'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
