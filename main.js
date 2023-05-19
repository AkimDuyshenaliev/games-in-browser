import {
  sudokuMatrix,
  generateArray,
  diagonalSudokuFill,
  fillSudokuBoard,
  checkIfCorrect,
} from "./utils/board-generation.js";
import { createChoices, unsolveTheBoard } from "./utils/qol-functions.js";

generateTable();

function generateTable() {
  let baseMatrix = sudokuMatrix();
  var table = document.createElement("table");
  var nums = generateArray(1, 9, false);

  unsolveTheBoard(baseMatrix, 17);

  for (let row = 0; row < baseMatrix.length; row++) {
    let tr = document.createElement("tr");

    for (let col = 0; col < baseMatrix[row].length; col++) {
      let td = document.createElement("td");
      let select = document.createElement("select");
      select.addEventListener("change", checkIfCorrect);
      select.id = row.toString() + "-" + col.toString();

      createChoices(select, nums, baseMatrix[row][col]);

      td.appendChild(select);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }

  document.getElementById("table-container").appendChild(table);
}
