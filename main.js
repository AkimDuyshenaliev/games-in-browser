import {
  generateArray,
  diagonalSudokuFill,
  fillSudokuBoard,
  checkIfCorrect,
} from "./utils/board-generation.js";

// generateTable();

sudokuMatrix();
function sudokuMatrix(dimensions = [9, 9], empty = false) {
  // [9, 9] matrix
  let baseMatrix;

  if (empty == true) {
    baseMatrix = Array(dimensions[0])
      .fill()
      .map(() => Array(dimensions[1]).fill(0));
    return baseMatrix;
  }

  let i = 0;
  baseMatrix = Array(dimensions[0])
    .fill()
    .map(() => Array(dimensions[1]).fill(0));
  diagonalSudokuFill(baseMatrix); // Fill 3 diagonal sudoku 9x9 blocks, left top to right bottom
  fillSudokuBoard(baseMatrix, 0, 0); // Fill the rest of the blocks recursively, using Backtracking algorithm
  console.log(baseMatrix);
}

function generateTable() {
  // [[0-0],[0-1],...,[9-8],[9-9]] - row id, cell id
  var baseMatrix = sudokuMatrix([9, 9], true);
  var table = document.createElement("table");
  var tableBody = document.createElement("tbody");
  var nums = generateArray(1, 9, false);

  var i = 0;
  baseMatrix.forEach(function (rowData) {
    var row = document.createElement("tr");

    var j = 0;
    rowData.forEach(function (cellData) {
      var cell = document.createElement("td");
      var select = document.createElement("select");
      select.addEventListener("change", checkIfCorrect);
      select.id = i.toString() + "-" + j.toString();

      nums.forEach(function (choice) {
        var option = document.createElement("option");
        var txt = document.createTextNode(choice);

        option.appendChild(txt);
        option.setAttribute("value", choice);
        select.appendChild(option);
      });
      j++;
      cell.appendChild(select);
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
    i++;
  });

  table.appendChild(tableBody);
  let tableContainer = document
    .getElementById("table-container")
    .appendChild(table);

  return table;
}
