import {
  sudokuMatrix,
  generateArray,
  diagonalSudokuFill,
  fillSudokuBoard,
} from "./utils/board-generation.js";
import {
  createChoices,
  removeChoices,
  unsolveTheBoard,
  checkIfCorrect,
  cellObserver,
} from "./utils/qol-functions.js";

sudokuBoard();

function sudokuBoard() {
  let choices = generateArray(0, 10, false);
  let matrix = sudokuMatrix();
  unsolveTheBoard(matrix, 17);

  for (let row = 0; row < matrix.length; row++) {
    let rowBox = document.createElement("div");
    rowBox.classList.add("flex-container");

    for (let col = 0; col < matrix[row].length; col++) {
      let cell = document.createElement("div");
      cell.classList.add("flex-container-cells");

      if (matrix[row][col] == 0) {
        cell.style.setProperty("background-color", "white", "");
        cell.innerHTML = "";
        cell.addEventListener("click", (event) => {
          createChoices(event, choices, cell);
        });

        cellObserver(cell); //Observe changes in innerHTML and remove choices when number selected
      } else {
        cell.style.setProperty("background-color", "lightgrey", "");
        cell.innerHTML = matrix[row][col];
      }

      let borderRow = row % 3 == false && row != 0 && row != 8;
      let borderCol = col % 3 == false && col != 0 && col != 8;
      if (borderRow) {
        cell.classList.add("top-border");
      }
      if (borderCol) {
        cell.classList.add("left-border");
      }
      cell.id = row + "-" + col;
      rowBox.appendChild(cell);
    }
    document.getElementById("custom-select").appendChild(rowBox);
  }
}
