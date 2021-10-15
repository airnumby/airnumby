
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import config from "../utils/config";
import firebaseConfig from '../utils/firebaseConfig';

initializeApp(firebaseConfig);


const db = getFirestore();
const auth = getAuth();

if (config.useEmulators) {
    connectFirestoreEmulator(db, 'localhost', 8080);
}


const provider = new GoogleAuthProvider();

export const useDb = () => db;
export const useFirebaseAuth = () => ({ auth, provider })