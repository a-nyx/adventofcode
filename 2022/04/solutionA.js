const fs = require("fs");
const data = fs.readFileSync("./input.txt", "utf8");

const lines = data.split("\n");
let counts = 0;

for (let i = 0; i < lines.length; i++) {
  if (lines[i] == "") continue;

  const ranges = lines[i].split(",");
  const range1 = ranges[0].split("-").map(Number);
  const range2 = ranges[1].split("-").map(Number);

  const start1 = range1[0];
  const end1 = range1[1];
  const start2 = range2[0];
  const end2 = range2[1];

  if (
    (start1 <= start2 && end1 >= end2) ||
    (start2 <= start1 && end2 >= end1)
  ) {
    counts++;
  }
}

console.log(counts);
