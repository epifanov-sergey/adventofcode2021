import * as utils from '../utils';
import { CurlyBracket, AngleBracket, SquareBracket, RoundBracket, BracketsQueue } from './bracket';

class BracketsFactory {
  create(symbol: string) {
    if (symbol === '(' || symbol === ')') {
      return new RoundBracket(1);
    }
    if (symbol === '[' || symbol === ']') {
      return new SquareBracket(2);
    }
    if (symbol === '{' || symbol === '}') {
      return new CurlyBracket(3);
    }
    if (symbol === '<' || symbol === '>') {
      return new AngleBracket(4);
    }
  }
}

export class BracketsQueuePartTwo extends BracketsQueue {
  constructor() {
    super(new BracketsFactory());
  }

  add(symbol: string) {
    super.add(symbol);
  }

  clear(): void {
    this._brackets = [];
  }

  completeLine(): number {
    let counter = 0;
    while (this._brackets.length) {
      const current = this._brackets.pop();
      counter = counter * 5 + current._value;
    }
    return counter;
  }
}

const getMedian = (arr: number[]): number => {
  const half = Math.floor(arr.length / 2);

  if (arr.length % 2) {
    return arr[half];
  } else {
    return (arr[half] + arr[half] + 1) / 2;
  }
};

((path: string, data = utils.readFile(path)) => {
  const input: string[] = data.split(utils.LINE_BREAK).map((line: string) => line.split(''));
  const result: number[] = [];
  for (let i = 0; i < input.length; i++) {
    const bracketsQueue: BracketsQueuePartTwo = new BracketsQueuePartTwo();
    for (let j = 0; j < input[i].length; j++) {
      try {
        bracketsQueue.add(input[i][j]);
      } catch (e) {
        console.log(e);
        bracketsQueue.clear();
        break;
      }
    }
    if (bracketsQueue._brackets.length) {
      result.push(bracketsQueue.completeLine());
    }
  }
  result.sort((a: number, b: number) => a - b);
  console.log('result', getMedian(result));
})(process.argv[1]);
