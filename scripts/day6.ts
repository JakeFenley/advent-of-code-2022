import * as fs from 'fs';
import path from 'path';

const inputs = fs
  .readFileSync(path.join(__dirname, '../inputs/day6.md'), 'utf-8')
  .split('');

let chars: string[] = [];

const reset = (char: string) => {
  const newChars: string[] = [];
  chars.push(char);
  chars.reverse();

  for (let i = 0; i < chars.length; i++) {
    if (!newChars.includes(chars[i])) {
      newChars.unshift(chars[i]);
    } else {
      break;
    }
  }

  chars = newChars;
};

const getMarker = (characterAmt: number) => {
  for (let i = 0; i < inputs.length; i++) {
    const marker = i + 1;
    const char = inputs[i];

    if (chars.length === characterAmt - 1 && !chars.includes(char)) {
      return marker;
    }

    if (!chars.includes(char)) {
      chars.push(char);
    } else {
      reset(char);
    }
  }
};

console.log(getMarker(4));
console.log(getMarker(14));
