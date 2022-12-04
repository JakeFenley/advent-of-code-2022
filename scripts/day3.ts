import * as fs from 'fs';
import path from 'path';

let inputs = fs.readFileSync(
  path.join(__dirname, '../inputs/day3.md'),
  'utf-8'
);

const items = inputs.split(/\n/).map((val: string) => {
  const left = val.slice(0, val.length / 2).split('');
  const right = val.slice(val.length / 2).split('');
  return [left, right];
});

const priorities: Record<string, number> = {};

for (let i = 1; i <= 26; i++) {
  const char = String.fromCharCode(i + 96);
  priorities[char] = i;
}

for (let i = 27; i < 27 + 26; i++) {
  const char = String.fromCharCode(i + 38);
  priorities[char] = i;
}


type Rucksack = [string[], string[]];

const getPriority = (rucksack: Rucksack): number => {
  const leftItems = new Map();

  rucksack[0].forEach((item) => {
    leftItems.set(item, true);
  });

  for (let i = 0; i < rucksack[1].length; i++) {
    const item = rucksack[1][i];

    if (leftItems.has(item)) {
      return priorities[item];
    }
  }
};

const answer = items.reduce((acc, curr: Rucksack) => {
  const priority = getPriority(curr);

  return priority + acc;
}, 0);


console.log(answer);