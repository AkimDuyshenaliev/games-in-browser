export class SudokuMatrixGenerator {
  constructor() {
    this.dimensions = [9, 9];
  }

  sudokuMatrix(empty = false) {
    // [9, 9] matrix
    let baseMatrix;

    if (empty == true) {
      baseMatrix = Array(this.dimensions[0])
        .fill()
        .map(() => Array(this.dimensions[1]).fill(0));
      return baseMatrix;
    }

    baseMatrix = Array(this.dimensions[0])
      .fill()
      .map(() => Array(this.dimensions[1]).fill(0));
    this.diagonalSudokuFill(baseMatrix); // Fill 3 diagonal sudoku 9x9 blocks, left top to right bottom
    this.fillSudokuBoard(baseMatrix, 0, 0); // Fill the rest of the blocks recursively, using Backtracking algorithm
    return baseMatrix;
  }

  generateUniqueArray(startNum, endNum) {
    let nums = new Set([]);
    while (nums.size != endNum) {
      let nums = new Set([]);
      nums.add(startNum);
      startNum++;
    }
    return Array.from(nums);
  }

  generateRandomUniqueArray(from, to) {
    let nums = new Set([]);
    while (nums.size != to) {
      let nums = new Set([]);
      nums.add(Math.floor(Math.random() * (to - from + 1) + from));
    }
    return Array.from(nums);
  }

  diagonalSudokuFill(matrix) {
    for (let i = 0; i < matrix.length; i += 3) {
      let arr = this.generateRandomUniqueArray(1, 9);

      for (let j = i; j < i + 3; j++) {
        for (let k = i; k < i + 3; k++) {
          matrix[j][k] = arr.pop();
        }
      }
    }
  }

  fillSudokuBoard(matrix, row, col) {
    if (col >= matrix[row].length) {
      row++;
      col = 0;
    }
    if (row >= matrix.length) {
      return true;
    }
    if (matrix[row][col] != 0) {
      return this.fillSudokuBoard(matrix, row, col + 1);
    }

    let arr = this.generateRandomUniqueArray(1, 9);

    for (let num of arr) {
      // IMOIRTANT "LET NUM """OF""" ARR" """OF""" ARR
      if (devBoardCheck(matrix, row, col, num)) {
        matrix[row][col] = num;

        if (this.fillSudokuBoard(matrix, row, col + 1)) {
          return true;
        }

        matrix[row][col] = 0;
      }
    }
    return false; // No valid solution
  }

  devBoardCheck(matrix, row, col, num) {
    for (let i = 0; i < matrix[row].length; i++) {
      if (matrix[row][i] == num) {
        return false;
      } else if (matrix[i][col] == num) {
        return false;
      }
    }

    let rowCheck = Math.floor(row / 3) * 3;
    let colCheck = Math.floor(col / 3) * 3;

    for (let i = rowCheck; i < rowCheck + 3; i++) {
      for (let j = colCheck; j < colCheck + 3; j++) {
        if (matrix[i][j] == num) {
          return false;
        }
      }
    }

    return true;
  }
}
