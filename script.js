const player = document.getElementById("player");
const enemy = document.getElementById("enemy");
const breads = document.querySelectorAll(".bread");
const countEl = document.getElementById("count");
const message = document.getElementById("message");

let x = 150;
let y = 60;
let count = 0;
let alive = true;

const speed = 20;

/* 移動 */
function move(dx, dy) {
  if (!alive) return;

  x += dx;
  y += dy;

  x = Math.max(0, Math.min(window.innerWidth - 50, x));
  y = Math.max(50, Math.min(window.innerHeight - 150, y));

  player.style.left = x + "px";
  player.style.top = y + "px";

  checkBread();
  checkEnemy();
}

/* パン取得 */
function checkBread() {
  breads.forEach(bread => {
    if (bread.style.display === "none") return;

    if (isHit(player, bread)) {
      bread.style.display = "none";
      count++;
      countEl.textContent = count;
    }
  });
}

/* 敵判定 */
function checkEnemy() {
  if (isHit(player, enemy)) {
    if (count >= 5) {
      end("WIN! ばいきんをたおした！");
    } else {
      end("OUT… パンが足りない！");
    }
  }
}

function end(text) {
  alive = false;
  message.style.display = "flex";
  message.textContent = text;
}

/* 当たり判定 */
function isHit(a, b) {
  const ar = a.getBoundingClientRect();
  const br = b.getBoundingClientRect();
  return !(
    ar.right < br.left ||
    ar.left > br.right ||
    ar.bottom < br.top ||
    ar.top > br.bottom
  );
}

/* 十字キー操作 */
document.querySelectorAll("#pad button").forEach(btn => {
  btn.addEventListener("touchstart", () => {
    const dir = btn.dataset.dir;
    if (dir === "up") move(0, -speed);
    if (dir === "down") move(0, speed);
    if (dir === "left") move(-speed, 0);
    if (dir === "right") move(speed, 0);
  });
});