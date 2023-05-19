export function generateArray(startNum, arrayEndNum, random = true) {
  let nums = new Set([]);
  while (nums.size != arrayEndNum) {
    if (random == true) {
      nums.add(
        Math.floor(Math.random() * (arrayEndNum - startNum + 1) + startNum)
      );
    } else {
      nums.add(startNum);
      startNum++;
    }
  }
  let arrNums = Array.from(nums);
  return arrNums;
}

export function diagonalSudokuFill(matrix) {
  for (let i = 0; i < matrix.length; i += 3) {
    let arr = generateArray(1, 9);

    for (let j = i; j < i + 3; j++) {
      for (let k = i; k < i + 3; k++) {
        matrix[j][k] = arr.pop();
      }
    }
  }
}

export function fillSudokuBoard(matrix, row, col) {
  if (col >= matrix[row].length) {
    row++;
    col = 0;
  }
  if (row >= matrix.length) {
    return true;
  }
  if (matrix[row][col] != 0) {
    return fillSudokuBoard(matrix, row, col + 1);
  }

  let arr = generateArray(1, 9);

  for (let num of arr) { // IMOIRTANT "LET NUM """OF""" ARR" """OF""" ARR
    if (devBoardCheck(matrix, row, col, num)) {
      matrix[row][col] = num;

      if (fillSudokuBoard(matrix, row, col + 1)) {
        return true;
      }

      matrix[row][col] = 0;
    }
  }
  return false; // No valid solution
}

function devBoardCheck(matrix, row, col, num) {
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

export function checkIfCorrect(e) {
  console.log("Cell " + e.target.id + ", value " + e.target.value);
}
