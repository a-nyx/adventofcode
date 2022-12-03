const fs = require("fs");
const data = fs.readFileSync("./input.txt", "utf8");

const theirs = {
  A: 1, // Rock
  B: 2, // Paper
  C: 3, // Scissors
};

const mine = {
  X: 1, // Rock
  Y: 2, // Paper
  Z: 3, // Scissors
};

const lines = data.split("\n");
let score = 0;

lines.forEach((line) => {
  if (line == "") return;

  const t = line.split(" ")[0];
  const m = line.split(" ")[1];
  const t_val = theirs[t];
  const m_val = mine[m];

  score += m_val;
  if (m_val == t_val) score += 3;
  if (m_val == 1 && t_val == 3) score += 6;
  if (m_val == 2 && t_val == 1) score += 6;
  if (m_val == 3 && t_val == 2) score += 6;
});

console.log(score);
