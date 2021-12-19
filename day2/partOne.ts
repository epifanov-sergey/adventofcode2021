const utils = require('../utils');

enum ACTIONS {
  forward = 'forward',
  up = 'up',
  down = 'down',
};

((path: string, data = utils.readFile(path)) => {
  let depth = 0, horizontal = 0;
  const arrData = data.split(utils.LINE_BREAK);
  for(let i = 0; i < arrData.length; i++) {
    const [action, value] = arrData[i].split(' ');
    if(action === ACTIONS.forward) {
      horizontal += Number(value);
    }
    if(action === ACTIONS.up) {
      depth -= Number(value);
    }
    if(action === ACTIONS.down) {
      depth += Number(value);
    }
  }
  console.log('depth', depth);
  console.log('horizontal', horizontal);
  console.log('multiply', horizontal*depth);
})(process.argv[1]);
