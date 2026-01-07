const player = document.getElementById("player");
const game = document.getElementById("game");
const scoreEl = document.getElementById("score");
const gameOverEl = document.getElementById("gameOver");
const restartBtn = document.getElementById("restartBtn");
const speedControl = document.getElementById("speedControl");

let isJumping = false;
let position = 0;
let score = 0;
let speed = 6;
let alive = true;

/* ジャンプ */
function jump() {
  if (isJumping || !alive) return;

  isJumping = true;
  let up = setInterval(() => {
    if (position >= 120) {
      clearInterval(up);
      let down = setInterval(() => {
        if (position <= 0) {
          clearInterval(down);
          isJumping = false;
        }
        position -= 6;
        player.style.bottom = position + 60 + "px";
      }, 20);
    }
    position += 6;
    player.style.bottom = position + 60 + "px";
  }, 20);
}

document.addEventListener("touchstart", jump);
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
    if (x < 120 && x > 40 && position < 45) {
      endGame();
      clearInterval(timer);
    }

    // スコア加算（確実に通過後）
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

  setTimeout(spawnEnemy, 1800);
}

/* ゲームオーバー */
function endGame() {
  alive = false;
  gameOverEl.style.display = "block";
}

/* リスタート（reload禁止） */
restartBtn.addEventListener("click", () => {
  gameOverEl.style.display = "none";
  document.querySelectorAll(".obstacle").forEach(e => e.remove());
  score = 0;
  scoreEl.textContent = "SCORE: 0";
  position = 0;
  player.style.bottom = "60px";
  alive = true;
  spawnEnemy();
});

/* スピード調整 */
speedControl.addEventListener("input", e => {
  speed = Number(e.target.value);
});

spawnEnemy();
