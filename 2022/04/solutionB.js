const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8');

const lines = data.split('\n');

console.log(lines);
