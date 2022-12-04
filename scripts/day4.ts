import * as fs from 'fs';
import path from 'path';

let inputs = fs.readFileSync(
  path.join(__dirname, '../inputs/day4.md'),
  'utf-8'
);

const pairs = inputs.split(/\n/).map((v) =>
  v.split(',').map((v) => {
    const values = v.split('-').map((v) => parseInt(v, 10));

    return {
      min: values[0],
      max: values[1],
    };
  })
);

const answer = pairs.reduce((acc, curr) => {
  const elfOne = curr[0];
  const elfTwo = curr[1];

  if (elfTwo.min >= elfOne.max && elfTwo.min <= elfOne.max) {
    return acc + 1;
  }

  if (elfOne.min >= elfTwo.max && elfOne.min <= elfTwo.max) {
    return acc + 1;
  }

  if (elfTwo.max >= elfOne.min && elfTwo.max <= elfOne.max) {
    return acc + 1;
  }

  if (elfOne.max >= elfTwo.min && elfOne.max <= elfTwo.max) {
    return acc + 1;
  }

  return acc;
}, 0);

console.log(answer);
