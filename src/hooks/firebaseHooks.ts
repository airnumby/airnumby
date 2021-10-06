
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from '../utils/firebaseConfig';

initializeApp(firebaseConfig);


const db = getFirestore();
const auth = getAuth();


const provider = new GoogleAuthProvider();

export const useDb = () => db;
export const useFirebaseAuth = () => ({ auth, provider })