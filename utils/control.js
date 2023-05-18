export function generateArray(arrayEndNum = 9, random = true) {
  let nums = new Set([]);
  let startNum = 0;
  while (nums.size != arrayEndNum) {
    if (random == true) {
      nums.add(
        Math.floor(Math.random() * (arrayEndNum - (startNum + 1) + 1) + (startNum + 1))
      );
    } else {
      nums.add(startNum);
      startNum++;
    }
  }
  let arrNums = Array.from(nums);
  return arrNums;
}

export function checkIfCorrect(e) {
  console.log("Cell " + e.target.id + ", value " + e.target.value);
}
