export class SudokuMatrixGenerator {
  constructor() {
    this.dimensions = [9, 9];
    this.baseMatrix = this.generateEmptyMatrix();
    this.uniqueArray = this.generateUniqueArray(1, 9);
    this.randomUniqueArray = this.generateRandomUniqueArray(1, 9);
  }

  sudokuMatrix() {
    this.diagonalSudokuFill(); // Fill 3 diagonal sudoku 9x9 blocks, left top to right bottom
    this.fillSudokuBoard(0, 0); // Fill the rest of the blocks recursively, using Backtracking algorithm
    return this.baseMatrix
  }

  generateEmptyMatrix() {
    let baseMatrix;

    baseMatrix = Array(this.dimensions[0])
      .fill()
      .map(() => Array(this.dimensions[1]).fill(0));

    return baseMatrix;
  }

  generateUniqueArray(startNum, endNum) {
    let nums = new Set([]);
    while (nums.size != endNum) {
      nums.add(startNum);
      startNum++;
    }
    return Array.from(nums);
  }

  generateRandomUniqueArray(from, to) {
    let nums = new Set([]);
    while (nums.size != to) {
      nums.add(Math.floor(Math.random() * (to - from + 1) + from));
    }
    return Array.from(nums);
  }

  diagonalSudokuFill() {
    for (let i = 0; i < this.baseMatrix.length; i += 3) {
      let arr = this.generateRandomUniqueArray(1, 9);

      for (let j = i; j < i + 3; j++) {
        for (let k = i; k < i + 3; k++) {
          this.baseMatrix[j][k] = arr.pop();
        }
      }
    }
  }

  fillSudokuBoard(row, col) {
    if (col >= this.baseMatrix[row].length) {
      row++;
      col = 0;
    }
    if (row >= this.baseMatrix.length) {
      return true;
    }
    if (this.baseMatrix[row][col] != 0) {
      return this.fillSudokuBoard(row, col + 1);
    }

    let arr = this.randomUniqueArray;

    for (let num of arr) {
      // IMOIRTANT "LET NUM """OF""" ARR" """OF""" ARR
      if (this.devBoardCheck(row, col, num)) {
        this.baseMatrix[row][col] = num;

        if (this.fillSudokuBoard(row, col + 1)) {
          return true;
        }

        this.baseMatrix[row][col] = 0;
      }
    }
    return false; // No valid solution
  }

  devBoardCheck(row, col, num) {
    for (let i = 0; i < this.baseMatrix[row].length; i++) {
      if (this.baseMatrix[row][i] == num) {
        return false;
      } else if (this.baseMatrix[i][col] == num) {
        return false;
      }
    }

    let rowCheck = Math.floor(row / 3) * 3;
    let colCheck = Math.floor(col / 3) * 3;

    for (let i = rowCheck; i < rowCheck + 3; i++) {
      for (let j = colCheck; j < colCheck + 3; j++) {
        if (this.baseMatrix[i][j] == num) {
          return false;
        }
      }
    }

    return true;
  }
}


// const matrix = new SudokuMatrixGenerator()
// console.log(matrix.sudokuMatrix());
