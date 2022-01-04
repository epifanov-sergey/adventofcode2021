import * as utils from '../utils';

((path: string, data = utils.readFile(path)) => {
  const octopuses: number[][] = data
    .split(utils.LINE_BREAK)
    .map((line: string) => line.split('').map(Number));

  const dirs = [
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
  ];

  let step = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const cache = new Set();
    step++;
    const queue: number[][] = [];

    for (let i = 0; i < octopuses.length; i++) {
      for (let j = 0; j < octopuses[i].length; j++) {
        octopuses[i][j] = octopuses[i][j] === 9 ? 0 : octopuses[i][j] + 1;
        if (octopuses[i][j] === 0) {
          cache.add(i * octopuses[i].length + j);
          queue.push([i, j]);
        }
      }
    }

    while (queue.length) {
      const [x0, y0] = queue.shift();
      dirs.forEach(([dx, dy]) => {
        const x = x0 + dx;
        const y = y0 + dy;

        if (
          x >= 0 &&
          x <= 9 &&
          y >= 0 &&
          y <= 9 &&
          !(x === x0 && y === y0) &&
          !cache.has(x * octopuses.length + y)
        ) {
          octopuses[x][y] = octopuses[x][y] === 9 ? 0 : octopuses[x][y] + 1;
          if (octopuses[x][y] === 0) {
            cache.add(x * octopuses.length + y);
            queue.push([x, y]);
          }
        }
      });
    }

    if (cache.size === octopuses.length ** 2) {
      break;
    }
  }

  console.log('step', step);
})(process.argv[1]);
