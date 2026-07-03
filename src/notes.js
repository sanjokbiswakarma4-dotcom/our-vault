import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy
} from "firebase/firestore";

export function initLoveNotes() {
  const container = document.getElementById("loveNotesApp");

  if (!container) return;

  container.innerHTML = `
    <div class="notes-box">

      <textarea id="noteInput" placeholder="Write something romantic..."></textarea>

      <button id="saveNoteBtn">Save Note ❤️</button>

      <div id="notesList"></div>

    </div>
  `;

  const input = document.getElementById("noteInput");
  const saveBtn = document.getElementById("saveNoteBtn");
  const list = document.getElementById("notesList");

  const notesRef = collection(db, "loveNotes");
  const q = query(notesRef, orderBy("createdAt", "desc"));

  // Load notes in real-time
  onSnapshot(q, (snapshot) => {
    list.innerHTML = "";

    if (snapshot.empty) {
      list.innerHTML = "<p>No love notes yet ❤️</p>";
      return;
    }

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();

      const div = document.createElement("div");
      div.className = "note";

      div.innerHTML = `
        <p>${data.text}</p>
        <small>${data.createdAt?.toDate?.().toLocaleString() || ""}</small>
        <button data-id="${docSnap.id}">Delete</button>
      `;

      div.querySelector("button").addEventListener("click", async () => {
        await deleteDoc(doc(db, "loveNotes", docSnap.id));
      });

      list.appendChild(div);
    });
  });

  // Save note
  saveBtn.addEventListener("click", async () => {
    const text = input.value.trim();
    if (!text) return;

    await addDoc(notesRef, {
      text,
      createdAt: serverTimestamp()
    });

    input.value = "";
  });
}