const fs = require("fs");
// const data = fs.readFileSync("./inputA.txt", "utf8");
const data = fs.readFileSync("./inputB.txt", "utf8");
const lines = data.split("\n");

const table = Array(240).fill(".");
let cycle = -1;
let x = 1;

const checkSignal = () => {
  console.log({ cycle, x });
  if (Math.abs((cycle % 40) - x) < 2) {
    table[cycle] = "x";
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

console.log(table.join("").match(/.{1,40}/g));
