const utils = require('../utils');

type Acc = {
  0: number,
  1: number
};

((path: string, data = utils.readFile(path)) => {
  const matrix = [];
  const acc: Acc[] = [];
  let gamma = '', epsilon = '';
  const arrData = data.split(utils.LINE_BREAK);
  for(let i = 0; i < arrData.length; i++) {
    for(let j = 0; j < arrData[i].length; j++){
      matrix.push(arrData[i].split('').map(Number));
    }
  }
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if(!acc[j]) {
        acc[j] = {0: 0, 1: 0};
      }
      acc[j][matrix[i][j]]++;
    }
  }

  for(let i = 0; i < acc.length; i++) {
    if(acc[i]['0'] > acc[i]['1']) {
      gamma += `0`;
      epsilon += `1`;
    } else {
      gamma += `1`;
      epsilon += `0`;
    }
  }

  const gammaDecimal = parseInt(gamma, 2);
  const epsilonDecimal = parseInt(epsilon, 2);
  console.log('result', gammaDecimal*epsilonDecimal);
})(process.argv[1]);
