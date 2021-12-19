import * as utils from '../utils';

((path: string, data = utils.readFile(path)) => {
  const [numbersAsSting, ...nonFormattedBoards] = data.split(utils.DOUBLE_LINE_BREAK);
  const numbers = numbersAsSting.split(',');
  const boardsWithOnlyRows = nonFormattedBoards.map((i: string) => i.split(utils.LINE_BREAK));
  const boards = boardsWithOnlyRows.map((r: string[]) => r.map(c => c.split(' ').filter(Boolean)));
  const markedBoards: number[][][] = boards.map((r: string[][]) => r.map(c => c.map(() => 0)));
  let winNumber = null,
    winnerBoard = null,
    winnerBoardIndex = null,
    result = 0,
    sumUnmarked = 0;
  for (let i = 0; i < numbers.length; i++) {
    for (let b = 0; b < boards.length; b++) {
      for (let r = 0; r < boards[b].length; r++) {
        const index = boards[b][r].findIndex((e: string) => e === numbers[i]);
        if (index !== -1) {
          markedBoards[b][r][index] = 1;
        }
      }
    }
    findWinner: for (let b = 0; b < markedBoards.length; b++) {
      for (let r = 0; r < markedBoards[b].length; r++) {
        const isRowWithOnlyOnes =
          markedBoards[b][r].filter(rw => rw === 1).length === markedBoards[b].length;
        const col = [];
        for (let c = 0; c < markedBoards[b][r].length; c++) {
          col.push(markedBoards[b][r][c]);
        }
        const isColWithOnlyOnes = col.filter(t => t === 1).length === markedBoards[b].length;

        if (isRowWithOnlyOnes || isColWithOnlyOnes) {
          winNumber = Number(numbers[i]);
          winnerBoard = boards[b];
          winnerBoardIndex = b;
          break findWinner;
        }
      }
    }
    if (winnerBoard && winnerBoardIndex && winNumber) {
      break;
    }
  }
  if (winnerBoard && winnerBoardIndex && winNumber) {
    for (let r = 0; r < winnerBoard.length; r++) {
      for (let c = 0; c < winnerBoard[r].length; c++) {
        sumUnmarked += markedBoards[winnerBoardIndex][r][c] ? 0 : Number(winnerBoard[r][c]);
      }
    }
    result = sumUnmarked * winNumber;
  }
  console.log('result', result);
})(process.argv[1]);
