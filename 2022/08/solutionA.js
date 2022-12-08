const fs = require("fs");
const data = fs.readFileSync("./input.txt", "utf8");

const lines = data.split("\n");
let rows = lines.length;
const cols = lines[0].length;

const maxs = [];

// note maxTops, maxLefts
for (let r = 0; r < rows; r++) {
  if (lines[r] == "") {
    rows--;
    continue;
  }

  const lineMaxs = [];
  for (let c = 0; c < cols; c++) {
    const maxTop =
      r == 0 ? -1 : Math.max(maxs[r - 1][c].maxTop, maxs[r - 1][c].self);
    const maxLeft =
      c == 0 ? -1 : Math.max(lineMaxs[c - 1].maxLeft, lineMaxs[c - 1].self);
    lineMaxs.push({
      maxTop,
      maxLeft,
      self: Number(lines[r][c]),
    });
  }
  maxs.push(lineMaxs);
}

// note maxBottoms, maxRights
for (let r = rows - 1; r >= 0; r--) {
  if (lines[r] == "") continue;

  for (let c = cols - 1; c >= 0; c--) {
    const maxBottom =
      r == rows - 1
        ? -1
        : Math.max(maxs[r + 1][c].maxBottom, maxs[r + 1][c].self);

    const maxRight =
      c == cols - 1
        ? -1
        : Math.max(maxs[r][c + 1].maxRight, maxs[r][c + 1].self);

    maxs[r][c].maxBottom = maxBottom;
    maxs[r][c].maxRight = maxRight;
  }
}

// count trees
let count = 0;
for (let r = 0; r < maxs.length; r++) {
  for (let c = 0; c < maxs[0].length; c++) {
    const { self, maxTop, maxLeft, maxBottom, maxRight } = maxs[r][c];
    if (self > maxTop || self > maxBottom || self > maxRight || self > maxLeft)
      count++;
  }
}

console.log(count);
