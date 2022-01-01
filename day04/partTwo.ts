import * as utils from '../utils';

((path: string, data = utils.readFile(path)) => {
  const [numbersAsSting, ...nonFormattedBoards] = data.split(utils.DOUBLE_LINE_BREAK);
  const numbers = numbersAsSting.split(',');
  const boardsWithOnlyRows = nonFormattedBoards.map((i: string) => i.split(utils.LINE_BREAK));
  const boards = boardsWithOnlyRows.map((r: string[]) => r.map(c => c.split(' ').filter(Boolean)));
  const markedBoards = boards.map((r: string[][]) => r.map(c => c.map(() => 0)));
  const winnerBoardsIndexes: number[] = [];
  let lastWinNumber = null,
    winnerBoard = null,
    result = 0,
    sumUnmarked = 0;
  for (let i = 0; i < numbers.length; i++) {
    for (let b = 0; b < boards.length; b++) {
      if (winnerBoardsIndexes.includes(b)) {
        continue;
      }
      for (let r = 0; r < boards[b].length; r++) {
        const index = boards[b][r].findIndex((e: string) => e === numbers[i]);
        if (index !== -1) {
          markedBoards[b][r][index] = 1;
        }
      }
    }
    for (let b = 0; b < markedBoards.length; b++) {
      if (winnerBoardsIndexes.includes(b)) {
        continue;
      }
      for (let r = 0; r < markedBoards[b].length; r++) {
        const isRowWithOnlyOnes =
          markedBoards[b][r].filter((rw: number) => rw === 1).length === markedBoards[b].length;
        const col = [];
        for (let c = 0; c < markedBoards[b][r].length; c++) {
          col.push(markedBoards[b][r][c]);
        }
        const isColWithOnlyOnes = col.filter(clmn => clmn === 1).length === markedBoards[b].length;

        if (isRowWithOnlyOnes || isColWithOnlyOnes) {
          lastWinNumber = Number(numbers[i]);
          winnerBoard = boards[b];
          winnerBoardsIndexes.push(b);
          break;
        }
      }
    }
  }
  if (winnerBoard && winnerBoardsIndexes.length && lastWinNumber) {
    for (let r = 0; r < winnerBoard.length; r++) {
      for (let c = 0; c < winnerBoard[r].length; c++) {
        sumUnmarked += markedBoards[winnerBoardsIndexes[winnerBoardsIndexes.length - 1]][r][c]
          ? 0
          : Number(winnerBoard[r][c]);
      }
    }
    result = sumUnmarked * lastWinNumber;
  }
  console.log('result', result);
})(process.argv[1]);
