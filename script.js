const game = document.getElementById("game");
const player = document.getElementById("player");
const message = document.getElementById("message");

let jumping = false;
let gameOver = false;
let gravity = 0;
let obstacles = [];

function jump() {
  if (jumping || gameOver) return;
  jumping = true;
  gravity = 15;
}

document.addEventListener("click", jump);

function createObstacle() {
  const obs = document.createElement("div");
  obs.classList.add("obstacle");
  obs.style.left = "100%";
  game.appendChild(obs);
  obstacles.push(obs);
}

setInterval(createObstacle, 2000);

function gameLoop() {
  if (gameOver) return;

  // ジャンプ処理
  if (jumping) {
    let bottom = parseInt(player.style.bottom) || 60;
    bottom += gravity;
    gravity -= 1;
    if (bottom <= 60) {
      bottom = 60;
      jumping = false;
    }
    player.style.bottom = bottom + "px";
  }

  // 障害物移動
  obstacles.forEach((obs, index) => {
    let left = obs.offsetLeft;
    obs.style.left = left - 5 + "px";

    // 当たり判定
    if (
      left < 130 &&
      left > 80 &&
      parseInt(player.style.bottom) < 110
    ) {
      gameOver = true;
      message.textContent = "GAME OVER";
    }

    // 画面外
    if (left < -50) {
      obs.remove();
      obstacles.splice(index, 1);
    }
  });

  requestAnimationFrame(gameLoop);
}

gameLoop();
