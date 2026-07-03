
console.log("✅ script.js is running");

// Firebase connection (from HTML)
const db = window.db;

// ---------------- NAV ----------------
function openFolder(id) {
  document.querySelectorAll(".folder").forEach(f => f.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// ---------------- BACKGROUND ----------------
function setBackground(e) {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  document.body.style.background = `url(${url}) center/cover no-repeat`;
}

// ---------------- MUSIC ----------------
let songs = [];

function saveSongs() {
  const input = document.getElementById("songUpload");

  songs = Array.from(input.files).map(f => ({
    name: f.name,
    url: URL.createObjectURL(f)
  }));

  const list = document.getElementById("songList");
  list.innerHTML = "";

  songs.forEach(s => {
    const div = document.createElement("div");
    div.innerText = "🎵 " + s.name;

    div.onclick = () => {
      document.getElementById("player").src = s.url;
      document.getElementById("player").play();
    };

    list.appendChild(div);
  });
}

// ---------------- NOTES ----------------
let notes = [];

function saveNote() {
  const input = document.getElementById("noteInput");
  notes.push(input.value);
  input.value = "";

  const list = document.getElementById("noteList");
  list.innerHTML = "";

  notes.forEach(n => {
    const div = document.createElement("div");
    div.innerText = "💌 " + n;
    list.appendChild(div);
  });
}

// ---------------- PHOTOS ----------------
let photos = [];

function savePhotos() {
  const input = document.getElementById("photoUpload");

  photos = Array.from(input.files).map(f => URL.createObjectURL(f));

  const grid = document.getElementById("photoGrid");
  grid.innerHTML = "";

  photos.forEach(p => {
    const img = document.createElement("img");
    img.src = p;
    grid.appendChild(img);
  });
}

// ---------------- MOODS ----------------
function setMood(type) {
  const text = document.getElementById("moodText");

  if (type === "romantic") text.innerText = "💖 Everything feels like you";
  if (type === "sad") text.innerText = "🌧 Missing moments...";
  if (type === "happy") text.innerText = "☀ Everything feels alive";
}

// ---------------- TIMER ----------------
function startTimer() {
  let t = 60;
  const out = document.getElementById("time");

  const i = setInterval(() => {
    out.innerText = "🧘 " + t + "s";
    t--;

    if (t < 0) {
      clearInterval(i);
      out.innerText = "✨ Peace achieved";
    }
  }, 1000);
}