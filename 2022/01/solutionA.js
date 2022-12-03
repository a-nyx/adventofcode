const fs = require("fs");
const data = fs.readFileSync("./input.txt", "utf8");

const lines = data.split("\n");

let sum = 0;
let max = 0;

lines.forEach((e) => {
  const num = Number(e);

  if (num === 0) sum = 0;
  else sum += num;

  if (sum > max) max = sum;
});

console.log(max);
