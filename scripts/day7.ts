import * as fs from 'fs';
import path from 'path';

const inputs = fs
  .readFileSync(path.join(__dirname, '../inputs/day7.md'), 'utf-8')
  .split('\n');

interface File {
  name: string;
  size: number;
  ext?: string;
}

interface Directory {
  name: string;
  parent: Directory | null;
  directories: Map<string, Directory>;
  fileSizeSum: number;
  files: Map<string, File>;
}

const root: Directory = {
  name: '/',
  parent: null,
  directories: new Map(),
  fileSizeSum: 0,
  files: new Map(),
};

let cwd: Directory;

const mkDirIfDoesNotExist = (dirname: string): void => {
  if (!cwd.directories.has(dirname)) {
    const newDir: Directory = {
      name: dirname,
      directories: new Map(),
      fileSizeSum: 0,
      parent: cwd,
      files: new Map(),
    };
    cwd.directories.set(dirname, newDir);
  }
};

const getDir = (dirname: string): Directory => {
  mkDirIfDoesNotExist(dirname);

  return cwd.directories.get(dirname);
};

const changeDirectory = (cmd: string): void => {
  const regex = /\$ cd (.*)/;
  const path = regex.exec(cmd)[1];

  if (path === '/') {
    cwd = root;
  } else if (path === '..') {
    cwd = cwd.parent;
  } else {
    cwd = getDir(path);
  }
};

const list = (): void => {
  // just do nothing i guess
};

const execCommand = (cmd: string) => {
  if (cmd.startsWith('$ cd')) {
    return changeDirectory(cmd);
  }
  if (cmd.startsWith('$ ls')) {
    return list();
  }

  console.log('command not implemented', cmd);
};

const recursivelyAddFileSize = (dir: Directory, sizeToAdd: number) => {
  dir.fileSizeSum = dir.fileSizeSum + sizeToAdd;

  if (dir.parent) {
    recursivelyAddFileSize(dir.parent, sizeToAdd);
  }
};

const handleOutput = (output: string) => {
  const fileRegex = /(\d*) ([a-zA-Z]+).?([a-zA-Z]*)?/;

  if (output.startsWith('dir')) {
    const dirname = output.split('dir ')[1];
    mkDirIfDoesNotExist(dirname);
    return;
  }

  if (fileRegex.test(output)) {
    const match = fileRegex.exec(output);
    const size = parseInt(match[1], 10);
    const name = match[2];
    const ext = match[3];

    if (!cwd.files.has(name)) {
      cwd.files.set(name, {
        name,
        size,
        ext,
      });

      recursivelyAddFileSize(cwd, size);
    }

    return;
  }

  console.log('output handler not implemented', output);
};

const handleTerminalInputs = () => {
  inputs.forEach((terminalLine) => {
    if (terminalLine.startsWith('$')) {
      execCommand(terminalLine);
    } else {
      handleOutput(terminalLine);
    }
  });
};

const calcDeleteableStuff = (
  dirLimit: number,
  currentDirectory: Directory
): number => {
  let total = 0;

  currentDirectory.directories.forEach((dir) => {
    if (dir.fileSizeSum <= dirLimit) {
      total += dir.fileSizeSum;
    }
    total += calcDeleteableStuff(dirLimit, dir);
  });

  return total;
};

const main = () => {
  handleTerminalInputs();
  console.log(calcDeleteableStuff(100000, root));
};

main();
