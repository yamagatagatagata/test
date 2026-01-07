const game = document.getElementById("game");
const player = document.getElementById("player");
const message = document.getElementById("message");

let isJumping = false;
let velocity = 0;
let gravity = 1;
let obstacles = [];
let gameOver = false;

// 初期位置
player.style.bottom = "60px";

// タップでジャンプ
document.addEventListener("click", () => {
  if (isJumping || gameOver) return;
  isJumping = true;
  velocity = 18;
});

// 敵生成
function createObstacle() {
  if (gameOver) return;
  const obs = document.createElement("div");
  obs.classList.add("obstacle");
  obs.style.left = window.innerWidth + "px";
  game.appendChild(obs);
  obstacles.push(obs);
}

setInterval(createObstacle, 2000);

// メインループ
function gameLoop() {
  if (gameOver) return;

  // ジャンプ処理
  if (isJumping) {
    let bottom = parseInt(player.style.bottom);
    bottom += velocity;
    velocity -= gravity;

    if (bottom <= 60) {
      bottom = 60;
      isJumping = false;
    }
    player.style.bottom = bottom + "px";
  }

  // 敵移動 & 当たり判定
  obstacles.forEach((obs, index) => {
    let left = obs.offsetLeft;
    obs.style.left = left - 6 + "px";

    if (
      left < 120 &&
      left > 70 &&
      parseInt(player.style.bottom) < 110
    ) {
      gameOver = true;
      message.textContent = "GAME OVER";
    }

    if (left < -60) {
      obs.remove();
      obstacles.splice(index, 1);
    }
  });

  requestAnimationFrame(gameLoop);
}

gameLoop();
