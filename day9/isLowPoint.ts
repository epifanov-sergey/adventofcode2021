const isLeftLessThanCurrent = (i: number, j: number, matrix: number[][]): boolean => {
  if (j - 1 < 0) {
    return true;
  }
  return matrix[i][j] < matrix[i][j - 1];
};

const isRightLessThanCurrent = (i: number, j: number, matrix: number[][]): boolean => {
  if (j + 1 >= matrix[i].length) {
    return true;
  }
  return matrix[i][j] < matrix[i][j + 1];
};

const isTopLessThanCurrent = (i: number, j: number, matrix: number[][]): boolean => {
  if (i - 1 < 0) {
    return true;
  }
  return matrix[i][j] < matrix[i - 1][j];
};

const isBottomLessThanCurrent = (i: number, j: number, matrix: number[][]): boolean => {
  if (i + 1 >= matrix.length) {
    return true;
  }
  return matrix[i][j] < matrix[i + 1][j];
};

export const isLowPoint = (i: number, j: number, matrix: number[][]): boolean => {
  return [
    isLeftLessThanCurrent(i, j, matrix),
    isRightLessThanCurrent(i, j, matrix),
    isTopLessThanCurrent(i, j, matrix),
    isBottomLessThanCurrent(i, j, matrix),
  ].every(Boolean);
};
