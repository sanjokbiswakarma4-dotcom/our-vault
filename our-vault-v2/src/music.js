import { storage } from "./firebase.js";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll
} from "firebase/storage";

export function initMusicLibrary() {
  const container = document.getElementById("musicLibraryApp");

  if (!container) return;

  container.innerHTML = `
    <div class="music-box">

      <input type="file" id="musicInput" accept="audio/*" />

      <button id="uploadMusicBtn">Upload Music 🎵</button>

      <div id="musicList" class="music-list"></div>

    </div>
  `;

  const input = document.getElementById("musicInput");
  const uploadBtn = document.getElementById("uploadMusicBtn");
  const list = document.getElementById("musicList");

  const folderRef = ref(storage, "music");

  async function loadMusic() {
    list.innerHTML = "Loading songs...";

    try {
      const res = await listAll(folderRef);

      list.innerHTML = "";

      for (const itemRef of res.items) {
        const url = await getDownloadURL(itemRef);

        const div = document.createElement("div");
        div.className = "music-item";

        div.innerHTML = `
          <audio controls src="${url}"></audio>
          <button>Delete</button>
        `;

        div.querySelector("button").addEventListener("click", async () => {
          await deleteObject(itemRef);
          loadMusic();
        });

        list.appendChild(div);
      }
    } catch (err) {
      console.error(err);
      list.innerHTML = "<p>Error loading music</p>";
    }
  }

  uploadBtn.addEventListener("click", async () => {
    const file = input.files[0];
    if (!file) return;

    const fileRef = ref(storage, `music/${Date.now()}_${file.name}`);

    await uploadBytes(fileRef, file);

    input.value = "";

    loadMusic();
  });

  loadMusic();
}