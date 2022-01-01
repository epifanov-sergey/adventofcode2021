import * as utils from '../utils';
import { Direction } from './types';

((path: string, data = utils.readFile(path)) => {
  const arrData = data
    .split(utils.LINE_BREAK)
    .map((i: string) => i.split(' -> ').map((j: string) => j.split(',').map(Number)));
  const matrix = [];
  let counter = 0;
  for (let i = 0; i < arrData.length; i++) {
    const x1 = arrData[i][0][0],
      x2 = arrData[i][1][0],
      y1 = arrData[i][0][1],
      y2 = arrData[i][1][1];
    if (x1 === x2 || y1 === y2) {
      let min = null,
        max = null,
        direction: Direction = null;
      if (x1 === x2) {
        direction = Direction.y;
        min = Math.min(y1, y2);
        max = Math.max(y1, y2);
      } else {
        direction = Direction.x;
        min = Math.min(x1, x2);
        max = Math.max(x1, x2);
      }
      if (min && max && direction) {
        for (let j = min; j <= max; j++) {
          if (direction === Direction.x) {
            if (matrix[j] === undefined) {
              matrix[j] = [];
            }
            if (matrix[j][y1] === undefined) {
              matrix[j][y1] = [0];
            }
            matrix[j][y1]++;
            if (matrix[j][y1] === 2) {
              counter++;
            }
          } else {
            if (matrix[x1] === undefined) {
              matrix[x1] = [];
            }
            if (matrix[x1][j] === undefined) {
              matrix[x1][j] = [0];
            }
            matrix[x1][j]++;
            if (matrix[x1][j] === 2) {
              counter++;
            }
          }
        }
      }
    }
  }
  console.log('counter', counter);
})(process.argv[1]);
