import * as fs from 'fs';
import path from 'path';

let inputs = fs.readFileSync(
  path.join(__dirname, '../inputs/day1.md'),
  'utf-8'
);

const elfCalories = inputs.split(/\n\n/).map((string) =>
  string
    .split(/\n/)
    .filter((val) => val.length)
    .map((val) => parseInt(val, 10))
);

const mostCaloriesPart1 = elfCalories.reduce((acc, curr) => {
  const currCalories = curr.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  if (currCalories > acc) {
    return currCalories;
  }

  return acc;
}, 0);

const mostCaloriesPart2 = elfCalories.reduce(
  (acc, curr) => {
    const currCalories = curr.reduce((acc, curr) => {
      return acc + curr;
    }, 0);

    if (
      currCalories > acc[0] ||
      currCalories > acc[1] ||
      currCalories > acc[2]
    ) {
      return [currCalories, ...acc].sort((a, b) => b - a).slice(0, 3);
    }

    return acc;
  },
  [0, 0, 0]
);

const sum = mostCaloriesPart2.reduce((acc, curr) => {
  return acc + curr;
}, 0);

console.log('part 1', mostCaloriesPart1);

console.log('part 2', sum);
