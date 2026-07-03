// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDu4MeaOjKHomp4BZupQEnEafWsJtymMME",
  authDomain: "our-vault-7528f.firebaseapp.com",
  projectId: "our-vault-7528f",
  storageBucket: "our-vault-7528f.appspot.com",
  messagingSenderId: "1078508669520",
  appId: "1:1078508669520:web:d6d5faf285dbddaa455f55"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Save Note
export async function saveNoteToFirebase(text) {
  await addDoc(collection(db, "notes"), {
    text,
    created: Date.now()
  });
}

// Load Notes
export async function loadNotesFromFirebase() {
  const q = query(collection(db, "notes"), orderBy("created"));

  const snap = await getDocs(q);

  const notes = [];

  snap.forEach(doc => {
    notes.push(doc.data().text);
  });

  return notes;
}