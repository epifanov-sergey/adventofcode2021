import * as utils from '../utils';

const getSum = (end: number) => {
  let acc = 0;
  for (let i = 1; i <= end; i++) {
    acc += i;
  }
  return acc;
};

((path: string, data = utils.readFile(path)) => {
  let fuelCost = 0;
  const arrData = data.split(',').map(Number);
  const mean = Math.floor(
    arrData.reduce((acc: number, value: number) => acc + value, 0) / arrData.length
  );
  for (let i = 0; i < arrData.length; i++) {
    const diff = Math.abs(arrData[i] - mean);
    fuelCost += getSum(diff);
  }
  console.log('mean', mean);
  console.log('fuelCost', fuelCost);
})(process.argv[1]);
