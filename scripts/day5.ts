import * as fs from 'fs';
import path from 'path';

const crateInputs = fs.readFileSync(
  path.join(__dirname, '../inputs/day5-crates.md'),
  'utf-8'
);

const moveInputs = fs.readFileSync(
  path.join(__dirname, '../inputs/day5-moves.md'),
  'utf-8'
);

let parsedCrates = crateInputs
  .split(/(.*)\n/)
  .filter((str) => str)
  .map((str) => str.split(/(.{4})/).filter((str) => str));

parsedCrates.splice(parsedCrates.length - 1, 1);

const crates = parsedCrates.reverse().reduce(
  (acc, curr) => {
    curr.forEach((val, i) => {
      const regex = new RegExp(/(\[(.)\])/);

      if (regex.test(val)) {
        const match = regex.exec(val);
        acc[i].push(match[2]);
      }
    });

    return acc;
  },
  Array.from({ length: 9 }, (arr) => new Array(0))
);

interface Move {
  count: number;
  from: number;
  dest: number;
}

const moves: Move[] = moveInputs
  .split(/(.*)\n/)
  .filter((str) => str)
  .reduce((acc, curr) => {
    const regex = /move (\d*) from (\d*) to (\d*)/;
    const match = regex.exec(curr);

    acc.push({
      count: parseInt(match[1], 10),
      from: parseInt(match[2], 10),
      dest: parseInt(match[3], 10),
    });

    return acc;
  }, []);

const moveCrates = ({
  count,
  from,
  dest,
  crates,
}: {
  count: number;
  from: number;
  dest: number;
  crates: string[][];
}): string[][] => {
  const cratesCopy = [...crates];
  const fromI = from - 1;
  const destI = dest - 1;

  for (let i = 0; i < count; i++) {
    const crate = cratesCopy[fromI].pop();
    cratesCopy[destI].push(crate);
  }

  return cratesCopy;
};

const movedCrates = moves.reduce(
  (acc, { count, dest, from }) => {
    const newCrates = moveCrates({ count, dest, from, crates: acc });

    return newCrates;
  },
  [...crates]
);

const answer = movedCrates.reduce((acc, curr) => {
  const newStr = acc + curr[curr.length - 1];

  return newStr;
}, '');

console.log(answer);
