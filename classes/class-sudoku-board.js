import { SudokuMatrixGenerator } from "./class-board-generator.js";

export class SudokuBoard extends SudokuMatrixGenerator {
  constructor(document, titleText) {
    super();

    this.document = document;
    this.baseElement = this.defineBase("div", "custom-select", [
      "flex-container",
    ]);
    this.title = this.defineTitle("h2", titleText);
    this.choices = super.generateUniqueArray(0, 10);
    this.matrix = super.sudokuMatrix();
    this.solution = JSON.parse(JSON.stringify(this.matrix));
    this.unsolveTheBoard(17);
  }

  defineBase(element, id, cssClasses) {
    let baseElement = this.document.createElement(element);
    baseElement.id = id;
    cssClasses.forEach((element) => {
      baseElement.classList.add(element);
    });
    return baseElement;
  }

  defineTitle(element, text) {
    let title = this.document.createElement(element);
    title.innerHTML = text;
    return title;
  }

  buildBoard(mainElement) {
    for (let row = 0; row < this.matrix.length; row++) {
      let rowBox = this.document.createElement("div");
      rowBox.classList.add("flex-container");

      for (let col = 0; col < this.matrix[row].length; col++) {
        let cell = this.document.createElement("div");
        cell.classList.add("flex-container-cells");

        this.cellLogic(row, col, cell, rowBox);

        this.cellStyles(cell, row, col, ["top-border"], ["left-border"]);
      }
      this.baseElement.appendChild(rowBox);
    }

    this.document.getElementById(mainElement).appendChild(this.title);
    this.document.getElementById(mainElement).appendChild(this.baseElement);
  }

  cellLogic(row, col, cell, rowBox) {
    if (this.matrix[row][col] == 0) {
      cell.style.setProperty("background-color", "white", "");
      cell.innerHTML = "";
      cell.addEventListener("click", (event) => {
        this.createChoices(event, cell);
      });

      this.cellObserver(cell); //Observe changes in innerHTML and remove choices when number selected
    } else {
      cell.style.setProperty("background-color", "lightgrey", "");
      cell.innerHTML = this.matrix[row][col];
    }

    cell.id = row + "-" + col;
    rowBox.appendChild(cell);
  }

  cellStyles(cell, row, col, topBorder, leftBorder) {
    let borderRow = row % 3 == false && row != 0 && row != 8;
    let borderCol = col % 3 == false && col != 0 && col != 8;
    if (borderRow) {
      this.setCssClassList(topBorder, cell);
    }
    if (borderCol) {
      this.setCssClassList(leftBorder, cell);
    }
  }

  createChoices(event, cell) {
    let lastChoices = this.document.getElementsByClassName(
      "options-flex-container"
    )[0];
    if (lastChoices) {
      lastChoices.remove();
    }
    let select = this.document.createElement("div");
    select.id = "choice-menu";
    select.classList.add("options-flex-container");
    // }

    for (let i = 1; i < this.choices.length; i++) {
      let choice = this.document.createElement("div");
      choice.id = "choice";
      choice.innerHTML = this.choices[i];
      choice.addEventListener("click", (event) => {
        if (this.checkIfCorrectCell(event, cell) == true) {
          cell.style.setProperty("background-color", "lightblue", "");
        } else {
          cell.style.setProperty("background-color", "red", "");
        }
        cell.innerHTML = event.target.innerHTML;
      });

      select.appendChild(choice);
    }
    cell.appendChild(select);
  }

  checkIfCorrectCell(e, cell) {
    let row = Number(cell.id.slice(0, 1));
    let col = Number(cell.id.slice(2, 3));
    let choice = Number(e.target.innerHTML);
    if (this.solution[row][col] == choice) {
      return true;
    } else {
      return false;
    }
  }

  cellObserver(cell) {
    //Observe changes in innerHTML and remove choices when number selected
    let simpleCounter = 0;
    const observerConfig = { characterData: true, childList: true };
    const callback = (mutationList, observer) => {
      for (const mutation of mutationList) {
        if (
          mutation.type === "childList" &&
          mutation.previousSibling != null &&
          cell.lastChild.length != 1 &&
          simpleCounter % 2 != 0
        ) {
          simpleCounter == 1 ? (simpleCounter = 0) : simpleCounter++;
        } else if (
          mutation.type === "childList" &&
          mutation.previousSibling != null &&
          cell.lastChild.length != 1 &&
          simpleCounter % 2 == 0
        ) {
          this.removeChoices(cell);
          simpleCounter == 1 ? (simpleCounter = 0) : simpleCounter++;
        }
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(cell, observerConfig);
  }

  setCssClassList(cssClasses, element) {
    cssClasses.forEach((css) => {
      element.classList.add(css);
    });
  }

  removeChoices(cell) {
    while (cell.lastChild.id == "choice-menu") {
      cell.removeChild(cell.lastChild);
    }
  }

  unsolveTheBoard(numOfClues) {
    let numsToThrowout = 9 * 9 - numOfClues;

    while (numsToThrowout != 0) {
      let randRow = Math.floor(Math.random() * (8 - 0 + 1 + 0));
      let randCol = Math.floor(Math.random() * (8 - 0 + 1 + 0));

      if (this.matrix[randRow][randCol] != 0) {
        this.matrix[randRow][randCol] = 0;
        numsToThrowout--;
      }
    }
  }
}
