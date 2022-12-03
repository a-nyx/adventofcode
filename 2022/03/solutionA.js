const fs = require("fs");
const data = fs.readFileSync("./input.txt", "utf8");

const lines = data.split("\n");
let sum = 0;

lines.forEach((line) => {
  const items = new Set();

  for (let i = 0; i < line.length; i++) {
    if (i < line.length / 2) {
      items.add(line[i]);
    } else if (items.has(line[i])) {
      const ascii = line.charCodeAt(i);
      if (ascii <= 90) {
        sum += ascii - 38;
      } else {
        sum += ascii - 96;
      }
      break;
    }
  }
});

console.log(sum);
