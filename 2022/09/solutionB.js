const fs = require("fs");
// const data = fs.readFileSync('./inputA.txt', 'utf8'); // answer: 1
// const data = fs.readFileSync('./inputB.txt', 'utf8'); // answer: 36
const data = fs.readFileSync("./inputC.txt", "utf8"); // answer: 2653

const lines = data.split("\n");

const unique = new Set();
const knot_count = 10;
let knots = Array(knot_count)
  .fill()
  .map(() => ({ r: 0, c: 0 }));
unique.add(JSON.stringify(knots[0]));

const getTailNewLoc = (oldHr, oldHc, newHr, newHc, oldTr, oldTc) => {
  const dx = Math.abs(newHr - oldTr);
  const dy = Math.abs(newHc - oldTc);
  // No move
  if (dx <= 1 && dy <= 1) return [oldTr, oldTc];

  // same row or col
  if (dx == 0) return [oldTr, (oldTc + newHc) / 2];
  if (dy == 0) return [(oldTr + newHr) / 2, oldTc];

  // diagonal when difference is L shape
  if (dx == 1) return [newHr, (oldTc + newHc) / 2];
  if (dy == 1) return [(oldTr + newHr) / 2, newHc];

  // diagonal when difference is 2x2
  if (dx == 2 && dy == 2) return [oldHr, oldHc];
};

const moveKnots = (newHr, newHc) => {
  const newKnots = Array(knot_count)
    .fill()
    .map(() => ({ r: 0, c: 0 }));
  newKnots[knot_count - 1].r = newHr;
  newKnots[knot_count - 1].c = newHc;

  for (let i = knot_count - 2; i >= 0; i--) {
    let oldHr = knots[i + 1].r;
    let oldHc = knots[i + 1].c;
    let oldTr = knots[i].r;
    let oldTc = knots[i].c;
    let newHr = newKnots[i + 1].r;
    let newHc = newKnots[i + 1].c;
    const [newTr, newTc] = getTailNewLoc(
      oldHr,
      oldHc,
      newHr,
      newHc,
      oldTr,
      oldTc
    );
    newKnots[i].r = newTr;
    newKnots[i].c = newTc;

    if (newTr == -1 && newTc == -1 && i == 0) {
      console.log({ oldHr, oldHc, newHr, newHc, oldTr, oldTc, newTr, newTc });
    }
  }

  knots = newKnots;
  unique.add(JSON.stringify(knots[0]));
};

for (let i = 0; i < lines.length; i++) {
  if (lines[i] == "") continue;
  const where = lines[i][0];
  const step = Number(lines[i].slice(2));

  for (let s = 0; s < step; s++) {
    let newHr = knots[knots.length - 1].r;
    let newHc = knots[knots.length - 1].c;
    if (where == "R") newHc++;
    if (where == "L") newHc--;
    if (where == "U") newHr--;
    if (where == "D") newHr++;
    moveKnots(newHr, newHc);
  }
}

// console.log(knots);
console.log(unique.size);
