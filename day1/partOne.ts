import * as utils from '../utils';

((path: string, data = utils.readFile(path)) => {
  let counter = 0;
  const arrData = data.split(utils.LINE_BREAK);
  for (let i = 0; i < arrData.length; i++) {
    if (arrData[i] && arrData[i - 1] && Number(arrData[i]) > Number(arrData[i - 1])) {
      counter++;
    }
  }
  console.log('counter', counter);
})(process.argv[1]);
