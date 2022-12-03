const fs = require("fs");
const data = fs.readFileSync("./input.txt", "utf8");

const values = {
  A: 1, // Rock
  B: 2, // Paper
  C: 3, // Scissors
};

const points = {
  X: 0,
  Y: 3,
  Z: 6,
};

const lines = data.split("\n");
let score = 0;

lines.forEach((line) => {
  if (line == "") return;

  const t = line.split(" ")[0];
  const res = line.split(" ")[1];

  score += points[res];

  if (res == "X") {
    if (t == "A") score += 3;
    if (t == "B") score += 1;
    if (t == "C") score += 2;
  }

  if (res == "Y") {
    score += values[t];
  }

  if (res == "Z") {
    if (t == "A") score += 2;
    if (t == "B") score += 3;
    if (t == "C") score += 1;
  }
});

console.log(score);
