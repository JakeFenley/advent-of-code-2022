import * as fs from 'fs';
import path from 'path';

let inputs = fs.readFileSync(
  path.join(__dirname, '../inputs/day3.md'),
  'utf-8'
);

const priorities: Record<string, number> = {};

for (let i = 1; i <= 26; i++) {
  const char = String.fromCharCode(i + 96);
  priorities[char] = i;
}

for (let i = 27; i < 27 + 26; i++) {
  const char = String.fromCharCode(i + 38);
  priorities[char] = i;
}

const items = inputs.split(/\n/).reduce((acc, curr, i) => {
  const deduped = Array.from(new Set(curr.split('')));


  if (i % 3 === 0) {
    acc.push([deduped]);
  } else {
    acc[acc.length - 1].push(deduped);
  }

  return acc;
}, []);

const getPriority = (arr: [string[], string[], string[]]) => {
  const items = new Set(arr[0]);
  const bagTwo = arr[1];
  const bagThree = arr[2];


  for (let i = 0; i < bagTwo.length; i++) {
    const bagTwoItem = bagTwo[i];

    if (items.has(bagTwoItem)) {
      for (let y = 0; y < bagThree.length; y++) {
        const bagThreeItem = bagThree[y];

        if (bagTwoItem === bagThreeItem) {
          return priorities[bagThreeItem];
        }
      }
    }
  }
};

const answer = items.reduce((acc, curr) => {
  const priority = getPriority(curr);

  return acc + priority;
}, 0);


console.log(answer);
