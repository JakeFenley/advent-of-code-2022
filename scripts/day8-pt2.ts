import * as fs from 'fs';
import path from 'path';

const inputs = fs
  .readFileSync(path.join(__dirname, '../inputs/day8.md'), 'utf-8')
  .split('\n')
  .map((row) => row.split('').map((val) => parseInt(val, 10)));

let highestScenicScore = 0;

const visibleTreesLeft = (x: number, y: number): number => {
  const tree = inputs[x][y];
  let count = 0;

  if (y === 0) {
    return 0;
  }

  for (let i = y - 1; i >= 0; i--) {
    count++;

    if (tree > inputs[x][i]) {
      continue;
    }

    if (tree <= inputs[x][i]) {
      break;
    }
  }

  return count;
};

const visibleTreesRight = (x: number, y: number): number => {
  const tree = inputs[x][y];
  let count = 0;

  if (y >= inputs[x].length) {
    return 0;
  }

  for (let i = y + 1; i < inputs[x].length; i++) {
    count++;

    if (tree > inputs[x][i]) {
      continue;
    }

    if (tree <= inputs[x][i]) {
      break;
    }
  }

  return count;
};

const visibleTreesTop = (x: number, y: number): number => {
  const tree = inputs[x][y];
  let count = 0;

  if (x === 0) {
    return 0;
  }

  for (let i = x - 1; i >= 0; i--) {
    count++;

    if (tree > inputs[i][y]) {
      continue;
    }

    if (tree <= inputs[i][y]) {
      break;
    }
  }

  return count;
};

const visibleTreesBottom = (x: number, y: number): number => {
  const tree = inputs[x][y];
  let count = 0;

  if (x === inputs.length - 1) {
    return 0;
  }

  for (let i = x + 1; i < inputs.length; i++) {
    count++;

    if (tree > inputs[i][y]) {
      continue;
    }

    if (tree <= inputs[i][y]) {
      break;
    }
  }

  return count;
};

for (let x = 0; x < inputs.length; x++) {
  const row = inputs[x];

  for (let y = 0; y < row.length; y++) {
    const result =
      visibleTreesTop(x, y) *
      visibleTreesLeft(x, y) *
      visibleTreesRight(x, y) *
      visibleTreesBottom(x, y);

    if (result > highestScenicScore) {
      highestScenicScore = result;
    }
  }
}

console.log(highestScenicScore);
