const player = document.getElementById("player");
const game = document.getElementById("game");
const scoreEl = document.getElementById("score");
const gameOverEl = document.getElementById("gameOver");
const restartBtn = document.getElementById("restartBtn");
const speedControl = document.getElementById("speedControl");
const speedValue = document.getElementById("speedValue");

let isJumping = false;
let y = 0;
let score = 0;
let speed = 6;
let alive = true;
let baseBottom = 100; // CSSと合わせる

/* ジャンプ */
function jump() {
  if (!alive || isJumping) return;

  isJumping = true;
  let up = setInterval(() => {
    if (y >= 140) {
      clearInterval(up);
      let down = setInterval(() => {
        if (y <= 0) {
          clearInterval(down);
          isJumping = false;
        }
        y -= 7;
        player.style.bottom = baseBottom + y + "px";
      }, 20);
    }
    y += 7;
    player.style.bottom = baseBottom + y + "px";
  }, 20);
}

document.addEventListener("touchstart", e => {
  if (e.target.id === "restartBtn") return;
  jump();
});

document.addEventListener("keydown", e => {
  if (e.code === "Space") jump();
});

/* 敵生成 */
function spawnEnemy() {
  if (!alive) return;

  const enemy = document.createElement("div");
  enemy.className = "obstacle";
  game.appendChild(enemy);

  let x = window.innerWidth;
  enemy.style.left = x + "px";

  let passed = false;

  let timer = setInterval(() => {
    if (!alive) {
      clearInterval(timer);
      return;
    }

    x -= speed;
    enemy.style.left = x + "px";

    // 当たり判定
    if (x < 110 && x > 40 && y < 40) {
      endGame();
      clearInterval(timer);
    }

    // スコア
    if (x < 40 && !passed) {
      passed = true;
      score++;
      scoreEl.textContent = "SCORE: " + score;
    }

    if (x < -60) {
      clearInterval(timer);
      enemy.remove();
    }
  }, 20);

  setTimeout(spawnEnemy, 1600);
}

/* ゲームオーバー */
function endGame() {
  alive = false;
  gameOverEl.style.display = "block";
}

/* リスタート */
restartBtn.addEventListener("click", () => {
  alive = true;
  gameOverEl.style.display = "none";

  document.querySelectorAll(".obstacle").forEach(e => e.remove());

  score = 0;
  scoreEl.textContent = "SCORE: 0";

  y = 0;
  isJumping = false;
  player.style.bottom = baseBottom + "px";

  spawnEnemy();
});

/* スピード調整（即反映） */
speedControl.addEventListener("input", e => {
  speed = Number(e.target.value);
  speedValue.textContent = speed;
});

spawnEnemy();
