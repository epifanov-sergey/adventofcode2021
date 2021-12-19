const utils = require('../utils');

((path: string, data = utils.readFile(path)) => {
  const arrData = data.split(utils.LINE_BREAK).map(i => i.split(' -> ').map(i => i.split(',').map(Number)));
  const matrix = [];
  const numbers = [];
  let counter = 0;
  for(let i = 0; i < arrData.length; i++) {
    const x1 = arrData[i][0][0], x2 = arrData[i][1][0], y1 = arrData[i][0][1], y2 = arrData[i][1][1];
    let x = null, y = null;
    while (x !== x2 || y !== y2) {
      let dx = (x1 === x2 || x === x2) ? 0 : Math.sign(x2 - x1);
      let dy = (y1 === y2 || y === y2) ? 0 : Math.sign(y2 - y1);
      x = (x ? x+dx : x1);
      y = (y ? y+dy : y1);
      if(matrix[y] === undefined) {
        matrix[y] = [];
      }
      if(matrix[y][x] === undefined) {
        matrix[y][x] = [0];
      }
      matrix[y][x]++;
      if(matrix[y][x] > 1 && !numbers.includes(`${x}${y}`)){
        counter++;
        numbers.push(`${x}${y}`);
      }
    }
  }
  console.log('counter', counter);
})(process.argv[1]);