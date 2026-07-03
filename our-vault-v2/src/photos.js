import { storage } from "./firebase.js";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll
} from "firebase/storage";

export function initPhotoGallery() {
  const container = document.getElementById("photoGalleryApp");

  if (!container) return;

  container.innerHTML = `
    <div class="photo-box">

      <input type="file" id="photoInput" accept="image/*" />

      <button id="uploadPhotoBtn">Upload Photo ❤️</button>

      <div id="photoList" class="photo-list"></div>

    </div>
  `;

  const input = document.getElementById("photoInput");
  const uploadBtn = document.getElementById("uploadPhotoBtn");
  const list = document.getElementById("photoList");

  const folderRef = ref(storage, "photos");

  // Load images
  async function loadPhotos() {
    list.innerHTML = "Loading...";

    const res = await listAll(folderRef);

    list.innerHTML = "";

    for (const itemRef of res.items) {
      const url = await getDownloadURL(itemRef);

      const div = document.createElement("div");
      div.className = "photo-item";

      div.innerHTML = `
        <img src="${url}" />
        <button>Delete</button>
      `;

      div.querySelector("button").addEventListener("click", async () => {
        await deleteObject(itemRef);
        loadPhotos();
      });

      list.appendChild(div);
    }
  }

  // Upload image
  uploadBtn.addEventListener("click", async () => {
    const file = input.files[0];
    if (!file) return;

    const fileRef = ref(storage, `photos/${Date.now()}_${file.name}`);

    await uploadBytes(fileRef, file);

    input.value = "";

    loadPhotos();
  });

  loadPhotos();
}