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

const addChar = (char: string) => {
  chars.push(char);
};

const getMarkerPt1 = () => {
  for (let i = 0; i < inputs.length; i++) {
    const marker = i + 1;
    const char = inputs[i];
  
    if (chars.length === 3 && !chars.includes(char)) {
      return marker;
    }
  
    if (!chars.includes(char)) {
      addChar(char);
    } else {
      reset(char);
    }
  }
}

const getMarkerPt2 = () => {
  for (let i = 0; i < inputs.length; i++) {
    const marker = i + 1;
    const char = inputs[i];
  
    if (chars.length === 13 && !chars.includes(char)) {
      return marker;
    }
  
    if (!chars.includes(char)) {
      addChar(char);
    } else {
      reset(char);
    }
  }
}



console.log(getMarkerPt2());
