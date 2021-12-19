const utils = require('../utils');

((path: string, data = utils.readFile(path)) => {
  const [numbersAsSting, ...nonFormattedBoards] = data.split(utils.DOUBLE_LINE_BREAK);
  const numbers = numbersAsSting.split(',');
  const boardsWithOnlyRows = nonFormattedBoards.map(i => i.split(utils.LINE_BREAK));
  const boards = boardsWithOnlyRows.map(r => r.map(c => c.split(' ').filter(Boolean)));
  const markedBoards = boards.map(r => r.map((c => c.map(() => 0))));
  let lastWinNumber = null, winnerBoardsIndexes = [], winnerBoard = null, result = 0, sumUnmarked = 0;
  for(let i=0; i<numbers.length; i++){
    for(let b=0; b<boards.length; b++) {
      if(winnerBoardsIndexes.includes(b)) {
        continue;
      }
      for(let r=0; r<boards[b].length; r++){
        const index = boards[b][r].findIndex(e => e === numbers[i]);
        if(index !== -1) {
          markedBoards[b][r][index] = 1;
        }
      }
    }
    for(let b=0; b<markedBoards.length; b++){
      if (winnerBoardsIndexes.includes(b)) {
        continue;
      }
      for(let r=0; r<markedBoards[b].length; r++){
        const isRowWithOnlyOnes = markedBoards[b][r].filter( i => i === 1).length === markedBoards[b].length;
        let col = [];
        for(let c=0; c<markedBoards[b][r].length; c++){
          col.push(markedBoards[b][r][c]);
        }
        const isColWithOnlyOnes = col.filter( i => i === 1).length === markedBoards[b].length;

        if(isRowWithOnlyOnes || isColWithOnlyOnes) {
          lastWinNumber = Number(numbers[i]);
          winnerBoard = boards[b];
          winnerBoardsIndexes.push(b);
          break;
        }
      }
    }
  }
  if(winnerBoard && winnerBoardsIndexes.length && lastWinNumber) {
    for(let r=0; r<winnerBoard.length; r++) {
      for(let c=0; c<winnerBoard[r].length; c++){
        sumUnmarked += markedBoards[winnerBoardsIndexes[winnerBoardsIndexes.length - 1]][r][c] ? 0 : Number(winnerBoard[r][c]);
      }
    }
    result = sumUnmarked * lastWinNumber;
  }
  console.log('result', result);
})(process.argv[1]);