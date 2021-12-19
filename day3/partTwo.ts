const utils = require('../utils');

type Acc = {
  0: number,
  1: number
};


const isOnlyUnique = (arr: number[][]): boolean => {
  let isUnique = true;
  if(arr.length) {
    const first = JSON.stringify(arr[0]);
    for(let i = 1; i < arr.length; i++) {
      if(JSON.stringify(arr[i]) !== first) {
        isUnique = false;
        break;
      }
  }
  }
  return isUnique;
};

const findRate = (data: number[][], type: keyof Acc, index = 0): number => {
  if(data.length === 1 || isOnlyUnique(data)) {
    return parseInt(data[0].join(''), 2);
  }
  let bit = 0;
  const acc = getAcc(data);
  if(type === 1){
    bit = acc[index]['0'] > acc[index]['1'] ? 0 : 1;
  } else {
    bit = acc[index]['0'] <= acc[index]['1'] ? 0 : 1;
  }
  return findRate(
    data.filter(item => item[index] === bit),
    type,
    index+1,
  )
};

const getAcc = (data: number[][]): Acc[] => {
  const acc: Acc[] = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if(!acc[j]) {
        acc[j] = {0: 0, 1: 0};
      }
      acc[j][data[i][j]]++;
    }
  }
  return acc;
}

((path: string, data = utils.readFile(path)) => {
  const matrix = [];
  const arrData = data.split(utils.LINE_BREAK);
  for(let i = 0; i < arrData.length; i++) {
    for(let j = 0; j < arrData[i].length; j++){
      matrix.push(arrData[i].split('').map(Number));
    }
  }

  const oxygenRate = findRate(matrix, 1);
  const co2Rate = findRate(matrix, 0);
  console.log('result', oxygenRate*co2Rate);

})(process.argv[1]);
