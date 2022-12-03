const fs = require("fs");
const data = fs.readFileSync("./input.txt", "utf8");

const lines = data.split("\n");

let sum = 0;
let maxs = [0, 0, 0];

lines.forEach((line) => {
  const num = Number(line);

  if (num !== 0) {
    sum += num;
  } else {
    console.log(sum);
    for (let i = 0; i < maxs.length; i++) {
      if (sum > maxs[i]) {
        maxs.splice(i, 0, sum);
        maxs.pop();
        break;
      }
    }
    sum = 0;
  }
});

console.log(maxs.reduce((acc, curr) => acc + curr, 0));
