import * as utils from '../utils';
import { isLowPoint } from './isLowPoint';

type Node = {
  x: number;
  y: number;
};

const findBasinSize = (i: number, j: number, matrix: number[][]): number => {
  let size = 0;
  const queue: Node[] = [{ x: i, y: j }];
  const visited: Record<string, boolean> = {};

  while (queue.length) {
    const { x, y } = queue.shift();
    if (!visited[`${x},${y}`]) {
      visited[`${x},${y}`] = true;
      size++;
    }
    if (y - 1 >= 0 && matrix[x][y - 1] < 9 && !visited[`${x},${y - 1}`]) {
      queue.push({ x, y: y - 1 });
    }
    if (y + 1 < matrix[x].length && matrix[x][y + 1] < 9 && !visited[`${x},${y + 1}`]) {
      queue.push({ x, y: y + 1 });
    }
    if (x - 1 >= 0 && matrix[x - 1][y] < 9 && !visited[`${x - 1},${y}`]) {
      queue.push({ x: x - 1, y });
    }
    if (x + 1 < matrix.length && matrix[x + 1][y] < 9 && !visited[`${x + 1},${y}`]) {
      queue.push({ x: x + 1, y });
    }
  }
  return size;
};

((path: string, data = utils.readFile(path)) => {
  const matrix: number[][] = data
    .split(utils.LINE_BREAK)
    .map((r: string) => r.split('').map(Number));

  const lowPoints: Node[] = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (isLowPoint(i, j, matrix)) {
        lowPoints.push({ x: i, y: j });
      }
    }
  }

  const basinSizes: number[] = [];
  lowPoints.forEach(({ x, y }) => {
    basinSizes.push(findBasinSize(x, y, matrix));
  });
  basinSizes.sort((a: number, b: number) => b - a);
  console.log('basinSizes', basinSizes);
  console.log('result', basinSizes[0] * basinSizes[1] * basinSizes[2]);
})(process.argv[1]);
