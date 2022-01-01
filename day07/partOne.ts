import * as utils from '../utils';

((path: string, data = utils.readFile(path)) => {
  let median,
    fuelCost = 0;
  const arrData = data
    .split(',')
    .map(Number)
    .sort((a: number, b: number) => a - b);
  if (arrData.length % 2) {
    median = arrData[arrData.length / 2];
  } else {
    median = (arrData[Math.floor((arrData.length - 1) / 2)] + arrData[arrData.length / 2]) / 2;
  }
  for (let i = 0; i < arrData.length; i++) {
    fuelCost += Math.abs(arrData[i] - median);
  }
  console.log('fuelCost', fuelCost);
})(process.argv[1]);
