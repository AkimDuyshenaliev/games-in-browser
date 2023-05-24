import {
  sudokuMatrix,
  generateArray,
  diagonalSudokuFill,
  fillSudokuBoard,
} from "../utils/board-generation.js";
import {
  createChoices,
  removeChoices,
  unsolveTheBoard,
  checkIfCorrect,
} from "../utils/qol-functions.js";

const BoardClass = SudokuBoard();

cell.id = row + "-" + col;
rowBox.appendChild(cell);
document.getElementById("custom-select").appendChild(rowBox);

class SudokuBoard {
  constructor() {
    this.choices = generateArray(0, 10, false);
    this.matrix = unsolveTheBoard(sudokuMatrix(), 17);
  }

  generateSudokuBoard() {
    let rows = this.onePass(
      document.getElementById("custom-select"),
      this.matrix,
      "flex-container",
      "border-top",
      "2px solid"
    );
    for (let row = 0; row < rows.length; row++) {
      let cols = this.onePass(
        rows[row],
        this.matrix[row],
        "flex-container-cells",
        "border-left",
        "1px solid"
      );
    }
  }

  onePass(parent, data, styleClassName, propertyName, propertyValue) {
    for (let i = 0; i < data.length; i++) {
      let divBox = document.createElement("div");
      divBox.classList.add(styleClassName);

      if (i % 3 == false && i != 0 && i != 8) {
        divBox.style.setProperty(propertyName, propertyValue, "");
      }
      parent.appendChild(divBox);
    }
  }

  cell(matrix, row, col, cell) {
    if (matrix[row][col] == 0) {
      cell.style.setProperty("background-color", "white", "");
      cell.innerHTML = "";
      cell.addEventListener("click", (event) => {
        createChoices(event, choices, cell);
      });
    } else {
      cell.style.setProperty("background-color", "lightgrey", "");
      cell.innerHTML = matrix[row][col];
    }
  }
}
