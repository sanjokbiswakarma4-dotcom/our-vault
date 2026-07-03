export function initMeditationTimer() {
  const container = document.getElementById("meditationApp");

  if (!container) return;

  container.innerHTML = `
    <div class="meditation-box">

      <h3>🧘 Meditation Timer</h3>

      <input type="number" id="minutesInput" placeholder="Enter minutes" min="1" />

      <div class="timer-display" id="timerDisplay">00:00</div>

      <div class="controls">
        <button id="startBtn">Start ▶️</button>
        <button id="pauseBtn">Pause ⏸️</button>
        <button id="resetBtn">Reset 🔄</button>
      </div>

    </div>
  `;

  const input = document.getElementById("minutesInput");
  const display = document.getElementById("timerDisplay");

  const startBtn = document.getElementById("startBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const resetBtn = document.getElementById("resetBtn");

  let timeLeft = 0;
  let interval = null;
  let running = false;

  function updateDisplay() {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;

    display.textContent =
      String(min).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
  }

  startBtn.addEventListener("click", () => {
    if (!running) {
      if (timeLeft === 0) {
        timeLeft = (parseInt(input.value) || 1) * 60;
      }

      running = true;

      interval = setInterval(() => {
        timeLeft--;

        updateDisplay();

        if (timeLeft <= 0) {
          clearInterval(interval);
          running = false;
          alert("🧘 Meditation complete. Well done ❤️");
        }
      }, 1000);
    }
  });

  pauseBtn.addEventListener("click", () => {
    clearInterval(interval);
    running = false;
  });

  resetBtn.addEventListener("click", () => {
    clearInterval(interval);
    running = false;
    timeLeft = 0;
    display.textContent = "00:00";
    input.value = "";
  });

  updateDisplay();
}