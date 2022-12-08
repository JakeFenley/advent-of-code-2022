import * as fs from 'fs';
import path from 'path';

const inputs = fs
  .readFileSync(path.join(__dirname, '../inputs/day8.md'), 'utf-8')
  .split('\n')
  .map((row) => row.split('').map((val) => parseInt(val, 10)));

let visibleTrees: Set<string> = new Set();

const addTree = (x: number, y: number) => {
  visibleTrees.add(`${x}.${y}`);
};

const isVisibleLeft = (x: number, y: number): boolean => {
  const tree = inputs[x][y];

  for (let i = 0; i <= inputs[x].length; i++) {
    if (i === y) {
      return true;
    }

    const treeToLeft = inputs[x][i];

    if (treeToLeft >= tree) {
      return false;
    }
  }
};

const isVisibleRight = (x: number, y: number): boolean => {
  const tree = inputs[x][y];

  for (let i = inputs[x].length - 1; i >= 0; i--) {
    if (y === i) {
      return true;
    }

    const treeToRight = inputs[x][i];

    if (treeToRight >= tree) {
      return false;
    }
  }
};

const isVisibleTop = (x: number, y: number): boolean => {
  const tree = inputs[x][y];

  for (let i = 0; i <= x; i++) {
    if (x === i) {
      return true;
    }

    const treeAbove = inputs[i][y];

    if (treeAbove >= tree) {
      return false;
    }
  }
};

const isVisibleBottom = (x: number, y: number): boolean => {
  const tree = inputs[x][y];

  for (let i = inputs[x].length - 1; i >= x; i--) {
    if (x === i) {
      return true;
    }

    const treeBelow = inputs[i][y];

    if (treeBelow >= tree) {
      return false;
    }
  }
};

for (let x = 0; x < inputs.length; x++) {
  const row = inputs[x];

  for (let y = 0; y < row.length; y++) {
    if (x === 0 || y === 0 || x === inputs.length - 1 || y === row.length - 1) {
      addTree(x, y);
      continue;
    }

    if (isVisibleLeft(x, y)) {
      addTree(x, y);
      continue;
    }

    if (isVisibleTop(x, y)) {
      addTree(x, y);
      continue;
    }

    if (isVisibleBottom(x, y)) {
      addTree(x, y);
      continue;
    }

    if (isVisibleRight(x, y)) {
      addTree(x, y);
      continue;
    }
  }
}

console.log(Array.from(visibleTrees.keys()).length)