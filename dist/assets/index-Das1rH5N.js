(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),document.body.style.backgroundImage=`url('/gf.jpg')`,document.body.style.backgroundSize=`cover`,document.body.style.backgroundPosition=`center`,document.body.style.backgroundAttachment=`fixed`;var e=document.querySelector(`#app`),t=`
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
`,n={notes:`
    <div class="page">
      <h2>❤️ Love Notes</h2>
      <textarea placeholder="Write your love note..." rows="5"></textarea>
      <br/>
      <button onclick="goHome()">⬅ Back</button>
    </div>
  `,photos:`
    <div class="page">
      <h2>🖼️ Photos</h2>

      <input type="file" id="photoInput" accept="image/*"/>
      <button onclick="uploadPhoto()">Upload</button>

      <div id="photoList"></div>

      <br/>
      <button onclick="goHome()">⬅ Back</button>
    </div>
  `,music:`
    <div class="page">
      <h2>🎵 Music</h2>
      <p>Coming soon 🎶</p>
      <button onclick="goHome()">⬅ Back</button>
    </div>
  `,mood:`
    <div class="page">
      <h2>🌙 Mood Journal</h2>
      <p>Coming soon 💭</p>
      <button onclick="goHome()">⬅ Back</button>
    </div>
  `,meditate:`
    <div class="page">
      <h2>🧘 Meditation Timer</h2>
      <p>Coming soon 🧘‍♀️</p>
      <button onclick="goHome()">⬅ Back</button>
    </div>
  `};function r(t){e.innerHTML=t}window.openPage=e=>r(n[e]),window.goHome=()=>r(t),window.uploadPhoto=function(){let e=document.getElementById(`photoInput`);if(!e.files.length){alert(`Select an image first 💖`);return}let t=e.files[0],n=new FileReader;n.onload=function(e){let t=document.createElement(`img`);t.src=e.target.result,t.style.width=`120px`,t.style.margin=`10px`,t.style.borderRadius=`12px`,t.style.boxShadow=`0 0 10px rgba(0,0,0,0.5)`,document.getElementById(`photoList`).appendChild(t)},n.readAsDataURL(t)},r(t),console.log(`💖 Vault Loaded`);