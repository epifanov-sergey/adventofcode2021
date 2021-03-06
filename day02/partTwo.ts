import * as utils from '../utils';
import { ACTIONS } from './types';

((path: string, data = utils.readFile(path)) => {
  let depth = 0,
    horizontal = 0,
    aim = 0;
  const arrData = data.split(utils.LINE_BREAK);
  for (let i = 0; i < arrData.length; i++) {
    const [action, value] = arrData[i].split(' ');
    if (action === ACTIONS.forward) {
      horizontal += Number(value);
      depth += Number(value) * aim;
    }
    if (action === ACTIONS.up) {
      aim -= Number(value);
    }
    if (action === ACTIONS.down) {
      aim += Number(value);
    }
  }
  console.log('multiply', horizontal * depth);
})(process.argv[1]);
