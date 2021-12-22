import * as utils from '../utils';
import { isLowPoint } from './isLowPoint';

((path: string, data = utils.readFile(path)) => {
  const matrix: number[][] = data
    .split(utils.LINE_BREAK)
    .map((r: string) => r.split('').map(Number));

  const lowPoints: number[] = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (isLowPoint(i, j, matrix)) {
        lowPoints.push(matrix[i][j] + 1);
      }
    }
  }

  const result = lowPoints.reduce((acc: number, current) => {
    return acc + current;
  }, 0);

  console.log('result', result);
})(process.argv[1]);
