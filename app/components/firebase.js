
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 
import { getStorage } from 'firebase/storage'; 


const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY_HERE",
  authDomain: "YOUR_FIREBASE_AUTH_DOMAIN_HERE",
  projectId: "YOUR_FIREBASE_PROJECT_ID_HERE",
  storageBucket: "YOUR_STORAGE_BUCKET_HERE",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID_HERE",
  appId: "YOUR_APP_ID_HERE"
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);


const db = getFirestore(app); 


const storage = getStorage(app);


export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential; 
  } catch (error) {
    throw error; 
  }
};


export { auth, db, storage }; 
