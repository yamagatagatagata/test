const box = document.getElementById("box");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const message = document.getElementById("message");

let score = 0;
let time = 10;
let playing = false;
let timer;

function randomPosition() {
  const x = Math.random() * (window.innerWidth - 80);
  const y = Math.random() * (window.innerHeight - 120) + 60;
  box.style.left = x + "px";
  box.style.top = y + "px";
}

box.addEventListener("click", () => {
  if (!playing) return;
  score++;
  scoreEl.textContent = score;
  randomPosition();
});

document.body.addEventListener("click", () => {
  if (playing) return;

  playing = true;
  score = 0;
  time = 10;
  scoreEl.textContent = score;
  timeEl.textContent = time;
  message.textContent = "";

  box.style.display = "block";
  randomPosition();

  timer = setInterval(() => {
    time--;
    timeEl.textContent = time;

    if (time <= 0) {
      clearInterval(timer);
      playing = false;
      box.style.display = "none";
      message.textContent = `終了！スコア：${score}`;
    }
  }, 1000);
});
