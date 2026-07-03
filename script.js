let songs = [];
let notes = [];
let photos = [];

function openFolder(id) {
  document.querySelectorAll(".folder")
    .forEach(f => f.classList.remove("active"));

  document.getElementById(id).classList.add("active");
}

/* BACKGROUND UPLOAD */
function setBackground(e) {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);

  document.body.style.background =
    `url(${url}) center/cover no-repeat`;
}

/* MUSIC */
function saveSongs() {
  const input = document.getElementById("songUpload");

  songs = Array.from(input.files).map(f => ({
    name: f.name,
    url: URL.createObjectURL(f)
  }));

  renderSongs();
}

function renderSongs() {
  const list = document.getElementById("songList");
  list.innerHTML = "";

  songs.forEach(s => {
    let div = document.createElement("div");
    div.innerText = "🎵 " + s.name;
    div.onclick = () => {
      document.getElementById("player").src = s.url;
      document.getElementById("player").play();
    };
    list.appendChild(div);
  });
}

/* NOTES */
function saveNote() {
  const input = document.getElementById("noteInput");
  notes.push(input.value);
  input.value = "";
  renderNotes();
}

function renderNotes() {
  const list = document.getElementById("noteList");
  list.innerHTML = "";

  notes.forEach(n => {
    let div = document.createElement("div");
    div.innerText = "💌 " + n;
    list.appendChild(div);
  });
}

/* PHOTOS */
function savePhotos() {
  const input = document.getElementById("photoUpload");

  photos = Array.from(input.files).map(f =>
    URL.createObjectURL(f)
  );

  renderPhotos();
}

function renderPhotos() {
  const grid = document.getElementById("photoGrid");
  grid.innerHTML = "";

  photos.forEach(p => {
    let img = document.createElement("img");
    img.src = p;
    grid.appendChild(img);
  });
}

/* MOODS */
function setMood(type) {
  const text = document.getElementById("moodText");

  if (type === "romantic") text.innerText = "💖 Everything feels like you";
  if (type === "sad") text.innerText = "🌧 Missing moments...";
  if (type === "happy") text.innerText = "☀ Everything feels alive";
}

/* TIMER */
function startTimer() {
  let t = 60;
  const out = document.getElementById("time");

  let i = setInterval(() => {
    out.innerText = "🧘 " + t + "s";
    t--;

    if (t < 0) {
      clearInterval(i);
      out.innerText = "✨ Peace achieved";
    }
  }, 1000);
}
