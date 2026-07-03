import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDu4MeaOjKHomp4BZupQEnEafWsJtymMME",
  authDomain: "our-vault-7528f.firebaseapp.com",
  projectId: "our-vault-7528f",
  storageBucket: "our-vault-7528f.firebasestorage.app",
  messagingSenderId: "1078508669520",
  appId: "1:1078508669520:web:d6d5faf285dbddaa455f55"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;