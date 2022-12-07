const fs = require("fs");
const data = fs.readFileSync("./input.txt", "utf8");

const letters = data;
const marker = [];
const length = 4;

for (let i = 0; i < letters.length; i++) {
  const letter = letters[i];
  const index = marker.indexOf(letter);

  if (index != -1) marker.splice(0, index + 1);
  marker.push(letter);

  if (marker.length == length) {
    console.log(letters.slice(i - length + 1, i + 1));
    console.log(i + 1);
    return;
  }
}
