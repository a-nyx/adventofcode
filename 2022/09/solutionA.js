const fs = require("fs");
const data = fs.readFileSync("./inputA.txt", "utf8"); // answer: 13

const lines = data.split("\n");

const getPosString = (r, c) => r.toString() + ":" + c.toString();

let hr = 0,
  hc = 0,
  tr = 0,
  tc = 0;
const unique = new Set();
unique.add(getPosString(tr, tc));

const getTailNewLoc = (oldHr, oldHc, newHr, newHc, oldTr, oldTc) => {
  // No need to move
  if (Math.abs(newHr - oldTr) <= 1 && Math.abs(newHc - oldTc) <= 1)
    return [oldTr, oldTc];

  // fo to head's old loc
  return [oldHr, oldHc];
};

for (let i = 0; i < lines.length; i++) {
  if (lines[i] == "") continue;
  const where = lines[i][0];
  const step = Number(lines[i].slice(2));

  for (let s = 0; s < step; s++) {
    let newHr = hr;
    let newHc = hc;
    if (where == "R") newHc++;
    if (where == "L") newHc--;
    if (where == "U") newHr--;
    if (where == "D") newHr++;

    const [newTr, newTc] = getTailNewLoc(hr, hc, newHr, newHc, tr, tc);

    hr = newHr;
    hc = newHc;
    tr = newTr;
    tc = newTc;

    unique.add(getPosString(tr, tc));
  }
}

console.log(unique.size);
