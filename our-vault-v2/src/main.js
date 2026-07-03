import "./style.css";

document.body.style.backgroundImage = "url('/gf.jpg')";
document.body.style.backgroundSize = "cover";
document.body.style.backgroundPosition = "center";
document.body.style.backgroundAttachment = "fixed";

const app = document.querySelector("#app");

// HOME PAGE
const home = `
<header class="hero">
  <h1>💖 Rashita X Sanjok</h1>
  <p>Our private romantic vault</p>
</header>

<main class="dashboard">

  <div class="card" onclick="openPage('notes')">❤️ Love Notes</div>
  <div class="card" onclick="openPage('photos')">🖼️ Photos</div>
  <div class="card" onclick="openPage('music')">🎵 Music</div>
  <div class="card" onclick="openPage('mood')">🌙 Mood</div>
  <div class="card" onclick="openPage('meditate')">🧘 Meditation</div>

</main>

<footer class="footer">
  <p>Made with 💖 forever</p>
</footer>
`;

// PAGES
const pages = {
  notes: `
    <div class="page">
      <h2>❤️ Love Notes</h2>
      <textarea placeholder="Write your love note..." rows="5"></textarea>
      <br/>
      <button onclick="goHome()">⬅ Back</button>
    </div>
  `,

  photos: `
    <div class="page">
      <h2>🖼️ Photos</h2>

      <input type="file" id="photoInput" accept="image/*"/>
      <button onclick="uploadPhoto()">Upload</button>

      <div id="photoList"></div>

      <br/>
      <button onclick="goHome()">⬅ Back</button>
    </div>
  `,

  music: `
    <div class="page">
      <h2>🎵 Music</h2>
      <p>Coming soon 🎶</p>
      <button onclick="goHome()">⬅ Back</button>
    </div>
  `,

  mood: `
    <div class="page">
      <h2>🌙 Mood Journal</h2>
      <p>Coming soon 💭</p>
      <button onclick="goHome()">⬅ Back</button>
    </div>
  `,

  meditate: `
    <div class="page">
      <h2>🧘 Meditation Timer</h2>
      <p>Coming soon 🧘‍♀️</p>
      <button onclick="goHome()">⬅ Back</button>
    </div>
  `
};

// RENDER
function render(html) {
  app.innerHTML = html;
}

// GLOBAL FUNCTIONS
window.openPage = (page) => render(pages[page]);
window.goHome = () => render(home);

// IMAGE UPLOAD (LOCAL ONLY)
window.uploadPhoto = function () {
  const input = document.getElementById("photoInput");

  if (!input.files.length) {
    alert("Select an image first 💖");
    return;
  }

  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const img = document.createElement("img");
    img.src = e.target.result;

    img.style.width = "120px";
    img.style.margin = "10px";
    img.style.borderRadius = "12px";
    img.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";

    document.getElementById("photoList").appendChild(img);
  };

  reader.readAsDataURL(file);
};

// INIT
render(home);

console.log("💖 Vault Loaded");