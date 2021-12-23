export class BracketError {
  message = '';
  value = 0;

  constructor(props: { message: string; value?: number }) {
    this.message = props.message;
    this.value = props.value ?? 0;
  }
}

enum BracketType {
  ROUND = 'round',
  SQUARE = 'square',
  CURLY = 'curly',
  ANGLE = 'angle',
}

interface BracketsLike {
  open: string;
  close: string;
  value: number;
  type: BracketType;
}

interface BracketsFactoryLike {
  create(symbol: string): Bracket;
}

export abstract class Bracket {
  _open = '';
  _close = '';
  _value = 0;
  _type: BracketType = null;

  protected constructor({ open, close, value, type }: BracketsLike) {
    this._value = value;
    this._type = type;
    if (open) {
      this._open = open;
    }
    if (close) {
      this._close = close;
    }
  }
}

export class RoundBracket extends Bracket {
  constructor(value: number) {
    super({
      open: '(',
      close: ')',
      type: BracketType.ROUND,
      value,
    });
  }
}

export class SquareBracket extends Bracket {
  constructor(value: number) {
    super({
      open: '[',
      close: ']',
      type: BracketType.SQUARE,
      value,
    });
  }
}

export class CurlyBracket extends Bracket {
  constructor(value: number) {
    super({
      open: '{',
      close: '}',
      type: BracketType.CURLY,
      value,
    });
  }
}

export class AngleBracket extends Bracket {
  constructor(value: number) {
    super({
      open: '<',
      close: '>',
      type: BracketType.ANGLE,
      value,
    });
  }
}

export abstract class BracketsQueue {
  _permittedSymbols = ['(', ')', '[', ']', '{', '}', '<', '>'];
  _open = [
    this._permittedSymbols[0],
    this._permittedSymbols[2],
    this._permittedSymbols[4],
    this._permittedSymbols[6],
  ];
  _close = [
    this._permittedSymbols[1],
    this._permittedSymbols[3],
    this._permittedSymbols[5],
    this._permittedSymbols[7],
  ];
  _brackets: Bracket[] = [];
  _bf: BracketsFactoryLike = null;

  protected constructor(bf: BracketsFactoryLike) {
    this._bf = bf;
  }

  add(symbol: string): void {
    if (!this._permittedSymbols.includes(symbol)) {
      throw new BracketError({ message: 'illegal symbol', value: 0 });
    }
    const bracket = this._bf.create(symbol);
    if (this._open.includes(symbol)) {
      this._brackets.push(bracket);
    }
    if (this._close.includes(symbol)) {
      const last = this._brackets.pop();
      if (!last || last._open !== bracket._open) {
        throw new BracketError({ message: 'wrong bracket type', value: bracket._value });
      }
    }
  }
}
