const player = document.getElementById("player");
const game = document.getElementById("game");
const scoreEl = document.getElementById("score");
const gameOverEl = document.getElementById("gameOver");
const speedControl = document.getElementById("speedControl");

let isJumping = false;
let gravity = 0.9;
let position = 0;
let score = 0;
let gameSpeed = 5;
let gameRunning = true;

/* ===== ジャンプ ===== */
function jump() {
  if (isJumping) return;
  let up = setInterval(() => {
    if (position >= 120) {
      clearInterval(up);
      let down = setInterval(() => {
        if (position <= 0) {
          clearInterval(down);
          isJumping = false;
        }
        position -= 5;
        player.style.bottom = position + 60 + "px";
      }, 20);
    }
    isJumping = true;
    position += 5;
    player.style.bottom = position + 60 + "px";
  }, 20);
}

document.addEventListener("touchstart", jump);
document.addEventListener("keydown", e => {
  if (e.code === "Space") jump();
});

/* ===== 敵生成 ===== */
function createObstacle() {
  if (!gameRunning) return;

  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  game.appendChild(obstacle);

  let obstacleLeft = window.innerWidth;
  obstacle.style.left = obstacleLeft + "px";

  let move = setInterval(() => {
    if (!gameRunning) {
      clearInterval(move);
      return;
    }

    obstacleLeft -= gameSpeed;
    obstacle.style.left = obstacleLeft + "px";

    // 当たり判定
    if (
      obstacleLeft < 130 &&
      obstacleLeft > 50 &&
      position < 50
    ) {
      gameOver();
      clearInterval(move);
    }

    if (obstacleLeft < -60) {
      clearInterval(move);
      game.removeChild(obstacle);
      score++;
      scoreEl.textContent = "SCORE: " + score;
    }
  }, 20);

  setTimeout(createObstacle, 2000);
}

/* ===== ゲームオーバー ===== */
function gameOver() {
  gameRunning = false;
  gameOverEl.style.display = "block";
}

/* ===== リスタート ===== */
function restart() {
  location.reload();
}

/* ===== スピード調整 ===== */
speedControl.addEventListener("input", e => {
  gameSpeed = Number(e.target.value);
});

createObstacle();
