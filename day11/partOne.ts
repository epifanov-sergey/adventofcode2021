import * as utils from '../utils';

type Octopus = { start: number; end: number };

const increaseEnergyLevel = (matrix: Octopus[][], row: number, col: number) => {
  if (matrix[row][col].end === 9) {
    matrix[row][col].end = 0;
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        if (i >= 0 && i <= 9 && j >= 0 && j <= 9 && !(i === row && j === col)) {
          increaseEnergyLevel(matrix, i, j);
        }
      }
    }
  } else {
    const isFlashing =
      matrix[row][col].start !== matrix[row][col].end && matrix[row][col].end === 0;
    if (!isFlashing) {
      matrix[row][col].end++;
    }
  }
};

((path: string, data = utils.readFile(path)) => {
  const octopuses: Octopus[][] = data
    .split(utils.LINE_BREAK)
    .map((line: string) => line.split('').map(i => ({ start: Number(i), end: Number(i) })));

  let flashes = 0;

  for (let step = 1; step <= 100; step++) {
    for (let i = 0; i < octopuses.length; i++) {
      for (let j = 0; j < octopuses[i].length; j++) {
        increaseEnergyLevel(octopuses, i, j);
      }
    }

    for (let i = 0; i < octopuses.length; i++) {
      for (let j = 0; j < octopuses[i].length; j++) {
        if (octopuses[i][j].end === 0) {
          flashes++;
        }
        octopuses[i][j].start = octopuses[i][j].end;
      }
    }
  }

  console.log('flashes', flashes);
})(process.argv[1]);
