const fs = require("fs");
// const data = fs.readFileSync("./inputA.txt", "utf8");
const data = fs.readFileSync("./inputB.txt", "utf8");
const lines = data.split("\n");

let sumSix = 0;
let cycle = 0;
let x = 1;

const checkSignal = () => {
  if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
    console.log({ x, cycle });
    sumSix += x * cycle;
  }
};

for (let i = 0; i < lines.length; i++) {
  if (lines[i] == "") continue;

  if (lines[i] === "noop") {
    cycle++;
    checkSignal();
  } else {
    const v = Number(lines[i].slice(5));
    cycle++;
    checkSignal();
    cycle++;
    checkSignal();
    x += v;
  }
}

console.log({ sumSix, cycle, x });
