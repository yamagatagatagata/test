const game = document.getElementById("game");
const player = document.getElementById("player");
const message = document.getElementById("message");

let jumping = false;
let gameOver = false;
let velocity = 0;
let obstacles = [];

player.style.bottom = "60px"; // ← 初期位置を必ず指定

function jump() {
  if (jumping || gameOver) return;
  jumping = true;
  velocity = 18;
}

document.addEventListener("click", jump);

function createObstacle() {
  const obs = document.createElement("div");
  obs.classList.add("obstacle");
  obs.style.left = window.innerWidth + "px";
  game.appendChild(obs);
  obstacles.push(obs);
}

setInterval(createObstacle, 2000);

function gameLoop() {
  if (gameOver) return;

  // ジャンプ処理
  if (jumping) {
    let bottom = parseInt(player.style.bottom);
    bottom += velocity;
    velocity -= 1.2;

    if (bottom <= 60) {
      bottom = 60;
      jumping = false;
    }
    player.style.bottom = bottom + "px";
  }

  // 障害物移動
  obstacles.forEach((obs, index) => {
    let left = obs.offsetLeft;
    obs.style.left = left - 6 + "px";

    // 当たり判定
    if (
      left < 120 &&
      left > 70 &&
      parseInt(player.style.bottom) < 110
    ) {
      gameOver = true;
      message.textContent = "GAME OVER";
    }

    // 画面外削除
    if (left < -60) {
      obs.remove();
      obstacles.splice(index, 1);
    }
  });

  requestAnimationFrame(gameLoop);
}

gameLoop();
