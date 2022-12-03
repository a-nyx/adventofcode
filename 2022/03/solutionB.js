const fs = require("fs");
const data = fs.readFileSync("./input.txt", "utf8");

const lines = data.split("\n");
let sum = 0;

for (let i = 0; i < lines.length - 2; i += 3) {
  const items = new Set();
  const intersection = new Set();

  for (let a = 0; a < lines[i].length; a++) {
    items.add(lines[i][a]);
  }

  for (let a = 0; a < lines[i + 1].length; a++) {
    if (items.has(lines[i + 1][a])) {
      intersection.add(lines[i + 1][a]);
    }
  }

  for (let a = 0; a < lines[i + 2].length; a++) {
    if (intersection.has(lines[i + 2][a])) {
      const ascii = lines[i + 2].charCodeAt(a);
      if (ascii <= 90) {
        sum += ascii - 38;
      } else {
        sum += ascii - 96;
      }
      break;
    }
  }
}

console.log(sum);
