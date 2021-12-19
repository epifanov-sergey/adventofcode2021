const { readFileSync } = require('fs');

export const readFile = (scriptPath: string) => {
  const scriptPathArray = scriptPath.split('/');

  scriptPathArray[scriptPathArray.length - 1] = 'input.txt';

  const path = scriptPathArray.join('/');

  return readFileSync(path, { encoding: 'utf8' }).trim();
};

export const LINE_BREAK = '\n';
export const DOUBLE_LINE_BREAK = '\n\n';
