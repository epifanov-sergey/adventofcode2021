const utils = require('../utils');

((path: string, data = utils.readFile(path)) => {
  let counter = 0;
  let triplet = [];
  let lastTripletSum = null;
  const arrData = data.split(utils.LINE_BREAK);
  for(let i = 0; i < arrData.length; i++){
    triplet.push(arrData[i]);
    if(triplet.length === 3) {
      const sum = Number(triplet[0]) + Number(triplet[1]) + Number(triplet[2]);
      if(sum && lastTripletSum && sum > lastTripletSum) {
        counter++;
      }
      lastTripletSum = sum;
      triplet.shift();
    }
  }
  console.log('counter', counter);
})(process.argv[1]);
