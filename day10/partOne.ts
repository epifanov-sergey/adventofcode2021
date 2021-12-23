import * as utils from '../utils';
import { RoundBracket, SquareBracket, AngleBracket, CurlyBracket, BracketsQueue } from './bracket';

class BracketsFactory {
  create(symbol: string) {
    if (symbol === '(' || symbol === ')') {
      return new RoundBracket(3);
    }
    if (symbol === '[' || symbol === ']') {
      return new SquareBracket(57);
    }
    if (symbol === '{' || symbol === '}') {
      return new CurlyBracket(1197);
    }
    if (symbol === '<' || symbol === '>') {
      return new AngleBracket(25137);
    }
  }
}

export class BracketsQueuePartOne extends BracketsQueue {
  constructor() {
    super(new BracketsFactory());
  }

  add(symbol: string): void {
    super.add(symbol);
  }
}

((path: string, data = utils.readFile(path)) => {
  const bracketsQueue: BracketsQueuePartOne = new BracketsQueuePartOne();
  let errorsScore = 0;
  const input: string[] = data.split(utils.LINE_BREAK).map((line: string) => line.split(''));
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      try {
        bracketsQueue.add(input[i][j]);
      } catch (e) {
        console.error(e);
        errorsScore += e.value;
      }
    }
  }
  console.log('errorScore', errorsScore);
})(process.argv[1]);
