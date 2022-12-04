const fs = require("fs");
const data = fs.readFileSync("./input.txt", "utf8");

const lines = data.split("\n");
let counts = 0;

for (let i = 0; i < lines.length; i++) {
  if (lines[i] == "") continue;

  const ranges = lines[i].split(",");
  const range1 = ranges[0].split("-");
  const range2 = ranges[1].split("-");

  const start1 = parseInt(range1[0]);
  const end1 = parseInt(range1[1]);
  const start2 = parseInt(range2[0]);
  const end2 = parseInt(range2[1]);

  if (
    (start1 <= start2 && end1 >= start2) ||
    (start2 <= start1 && end2 >= start1)
  ) {
    counts++;
  }
}

console.log(counts);
