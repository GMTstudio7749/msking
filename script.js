const size = 10;
const bombCount = 10;
const game = document.getElementById("game");

let grid = [];
let revealed = [];

function setup() {
  grid = Array.from({ length: size }, () => Array(size).fill(0));
  revealed = Array.from({ length: size }, () => Array(size).fill(false));

  // place bombs
  let bombs = 0;
  while (bombs < bombCount) {
    let x = Math.floor(Math.random() * size);
    let y = Math.floor(Math.random() * size);
    if (grid[y][x] !== 9) {
      grid[y][x] = 9;
      bombs++;
    }
  }

  // compute numbers
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (grid[y][x] === 9) continue;
      let count = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          let ny = y + dy, nx = x + dx;
          if (ny >= 0 && ny < size && nx >= 0 && nx < size && grid[ny][nx] === 9)
            count++;
        }
      }
      grid[y][x] = count;
    }
  }

  draw();
}

function draw() {
  game.innerHTML = "";
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (revealed[y][x]) {
        cell.classList.add("revealed");
        cell.textContent = grid[y][x] === 0 ? "" : grid[y][x] === 9 ? "💣" : grid[y][x];
      }
      cell.addEventListener("click", () => reveal(y, x));
      game.appendChild(cell);
    }
  }
}

function reveal(y, x) {
  if (revealed[y][x]) return;
  revealed[y][x] = true;
  if (grid[y][x] === 9) {
    alert("BOOM! Game over!");
  } else if (grid[y][x] === 0) {
    // flood reveal
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        let ny = y + dy, nx = x + dx;
        if (ny >= 0 && ny < size && nx >= 0 && nx < size) reveal(ny, nx);
      }
    }
  }
  draw();
}

setup();
