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

export function checkIfCorrect(e) {
  console.log("Cell " + e.target.id + ", value " + e.target.value);
}
