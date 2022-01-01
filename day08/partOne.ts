import * as utils from '../utils';

((path: string, data = utils.readFile(path)) => {
  const arrData: number[][] = data.split(utils.LINE_BREAK).map((line: string) => {
    const [, output] = line.split(' | ');
    return output.split(' ').map((str: string) => str.length);
  });

  const unique = [2, 4, 3, 7];
  let counter = 0;
  arrData.forEach(arr => {
    counter += arr.filter(i => unique.includes(i)).length;
  });

  console.log('counter', counter);
})(process.argv[1]);
