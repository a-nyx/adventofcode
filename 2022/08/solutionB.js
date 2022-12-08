const fs = require("fs");
const data = fs.readFileSync("./input.txt", "utf8");

const lines = data.split("\n");
let rows = lines.length;
const cols = lines[0].length;

// go brute force

let maxScenic = 0;
for (let r = 0; r < rows; r++) {
  if (lines[r] == "") continue;

  for (let c = 0; c < cols; c++) {
    let scenic = 0;

    let checkRow = r - 1;
    let checkCol = c - 1;

    let countTop = 0;
    while (checkRow >= 0 && lines[checkRow][c] < lines[r][c]) {
      countTop++;
      checkRow--;
    }
    if (checkRow >= 0) countTop++;

    let countLeft = 0;
    while (checkCol >= 0 && lines[r][checkCol] < lines[r][c]) {
      countLeft++;
      checkCol--;
    }
    if (checkCol >= 0) countLeft++;

    checkRow = r + 1;
    checkCol = c + 1;

    let countBottom = 0;
    while (checkRow < rows - 1 && lines[checkRow][c] < lines[r][c]) {
      countBottom++;
      checkRow++;
    }
    if (checkRow < rows - 1) countBottom++;

    let countRight = 0;
    while (checkCol < cols && lines[r][checkCol] < lines[r][c]) {
      countRight++;
      checkCol++;
    }
    if (checkCol < cols) countRight++;

    scenic = countTop * countLeft * countBottom * countRight;
    console.log({ scenic, r, c, countTop, countLeft, countBottom, countRight });
    if (scenic > maxScenic) maxScenic = scenic;
  }
}

console.log(maxScenic);
