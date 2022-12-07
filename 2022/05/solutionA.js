const fs = require("fs");
const data = fs.readFileSync("./input.txt", "utf8");

const lines = data.split("\n");

//  why not?
const stacks = [
  ["R", "P", "C", "D", "B", "G"],
  ["H", "V", "G"],
  ["N", "S", "Q", "D", "J", "P", "M"],
  ["P", "S", "L", "G", "D", "C", "N", "M"],
  ["J", "B", "N", "C", "P", "F", "L", "S"],
  ["Q", "B", "D", "Z", "V", "G", "T", "S"],
  ["B", "Z", "M", "H", "F", "T", "Q"],
  ["C", "M", "D", "B", "F"],
  ["F", "C", "Q", "G"],
];

for (let i = 10; i < lines.length; i++) {
  if (lines[i] == "") continue;
  const [move, from, to] = [...lines[i].matchAll(/[0-9]+/g)].map((e) =>
    Number(e[0])
  );

  const elements = stacks[from - 1].splice(
    stacks[from - 1].length - move,
    move
  );
  elements.reverse();
  stacks[to - 1].push(...elements);
}

for (let i = 0; i < stacks.length; i++) {
  process.stdout.write(stacks[i].pop());
}
