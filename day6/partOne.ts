const utils = require('../utils');

((path: string, data = utils.readFile(path)) => {
  const lanternFish = data.split(',').map(Number);
  let count = {};
  for (let lf of lanternFish) {
    if (count[lf] === undefined) {
      count[lf] = 0
    }
    count[lf]++;
  }
  for(let day = 0; day < 256; day++) {
    let new_count = {};
    for (let i in count) {
      let z = count[i];
      const index = Number(i);
      if (index > 0) {
        if (new_count[index-1] === undefined) {
          new_count[index-1] = 0
        }
        new_count[index-1] += z;
      }
      else {
        if (new_count[6] === undefined) {
          new_count[6] = 0
        }
        if (new_count[8] === undefined) {
          new_count[8] = 0
        }
        new_count[6] += z;
        new_count[8] += z;
      }
    }
    count = new_count;
  }
  console.log('lanternFish end', Object.values(count).reduce((acc: number, cur: number) => { return acc + cur }, 0));
})(process.argv[1]);
