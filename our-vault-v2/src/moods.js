import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";

export function initMoodJournal() {
  const container = document.getElementById("moodApp");

  if (!container) return;

  container.innerHTML = `
    <div class="mood-box">

      <select id="moodSelect">
        <option value="😊 Happy">😊 Happy</option>
        <option value="💖 Loved">💖 Loved</option>
        <option value="😌 Calm">😌 Calm</option>
        <option value="😢 Sad">😢 Sad</option>
        <option value="🔥 Excited">🔥 Excited</option>
      </select>

      <input id="moodText" placeholder="Write about your mood..." />

      <button id="saveMoodBtn">Save Mood 🌙</button>

      <div id="moodList"></div>

    </div>
  `;

  const select = document.getElementById("moodSelect");
  const input = document.getElementById("moodText");
  const btn = document.getElementById("saveMoodBtn");
  const list = document.getElementById("moodList");

  const moodsRef = collection(db, "moods");
  const q = query(moodsRef, orderBy("createdAt", "desc"));

  onSnapshot(q, (snapshot) => {
    list.innerHTML = "";

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();

      const div = document.createElement("div");
      div.className = "note";

      div.innerHTML = `
        <strong>${data.mood}</strong>
        <p>${data.text}</p>
        <small>${data.createdAt?.toDate?.().toLocaleString() || ""}</small>
      `;

      list.appendChild(div);
    });
  });

  btn.addEventListener("click", async () => {
    const text = input.value.trim();
    if (!text) return;

    await addDoc(moodsRef, {
      mood: select.value,
      text,
      createdAt: serverTimestamp()
    });

    input.value = "";
  });
}