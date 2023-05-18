import { generateArray, checkIfCorrect } from "./utils/control.js";

function sudokuMatrix(dimensions = [9, 9], empty = false) {
  // [9, 9] matrix
  if (empty == true) {
    let baseMatrix = Array(dimensions[0])
      .fill()
      .map(() => Array(dimensions[1]).fill(0));
  }

  let baseMatrix = Array();
  for (let i = 0; i <= dimensions[0]; i++) {
    baseMatrix.push(generateArray());
    /// Check is here! ! ! ! ///
  }
  console.log(baseMatrix);
  return baseMatrix;
}
sudokuMatrix();

function generateTable() {
  // [[0-0],[0-1],...,[9-8],[9-9]] - row id, cell id
  var baseMatrix = sudokuMatrix();
  var table = document.createElement("table");
  var tableBody = document.createElement("tbody");
  var nums = generateArray((arrayEndNum = 9), (random = false));

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
  tableContainer = document.getElementById("table-container");
  tableContainer.appendChild(table);

  return table;
}
