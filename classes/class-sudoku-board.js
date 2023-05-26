import { SudokuMatrixGenerator } from "./class-board-generator.js";

export class SudokuBoard extends SudokuMatrixGenerator {
  constructor(document) {
    super();

    this.document = document;
    this.baseElement = this.defineBase("div", "custom-select", [
      "flex-container",
    ]);
    this.title = this.defineTitle("h2", "Pure node.js Sudoku");
    this.choices = super.generateUniqueArray(0, 10);
    this.matrix = super.sudokuMatrix();
    this.solution = JSON.parse(JSON.stringify(this.matrix));
    this.unsolveTheBoard(17);
  }

  /**
   * The very base of the sudoku board, this element will contain the board
   * @param { String } element type of DOM element to use (preferable to use DIV)
   * @param { String } id id of the base element
   * @param { Array } cssClasses a list of String elements with css class names for base element
   * @return { node } complete base element
   */
  defineBase(element, id, cssClasses) {
    let baseElement = this.document.createElement(element);
    baseElement.id = id;
    cssClasses.forEach((element) => {
      baseElement.classList.add(element);
    });
    return baseElement;
  }

  /**
   * Create a title element for the sudoku board
   * @param { String } element type of DOM element to use to create title
   * @param { String } text text of the title
   * @return { node } node title element with selected text
   */
  defineTitle(element, text) {
    let title = this.document.createElement(element);
    title.innerHTML = text;
    return title;
  }

  /**
   * Main method that assembles the board, it starts and ends here
   * @param { String } mainElement the ID of the element in which to place the sudoku board
   */
  buildBoard(mainElement) {
    for (let row = 0; row < this.matrix.length; row++) {
      let rowBox = this.document.createElement("div");
      rowBox.classList.add("flex-container");

      for (let col = 0; col < this.matrix[row].length; col++) {
        let cell = this.document.createElement("div");
        cell.classList.add("flex-container-cells");

        this.cellLogic(row, col, cell, rowBox);

        this.borderStyles(cell, row, col, ["top-border"], ["left-border"]);
      }
      this.baseElement.appendChild(rowBox);
    }

    this.document.getElementById(mainElement).appendChild(this.title);
    this.document.getElementById(mainElement).appendChild(this.baseElement);
  }

  /**
   * Method for creating a standard cell before any changes are done, preselected values
   * also are assigned here
   * @param { Number } row row in which this cell is places
   * @param { Number } col column in which this cell is places
   * @param { node } cell a div element to be configured
   * @param { node } rowBox a div element in which cells for the current row are being kept
   */
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

  /**
   * Find specific rows and cols in the board and set appropriate css classes to create
   * a proper sudoku grid
   * @param { node } cell current cell that is being evaluated
   * @param { Number } row row that is being evaluated
   * @param { Number } col column that is being evaluated
   * @param { Array } topBorder a list of String values with css class names for top border
   * @param { Array } leftBorder a list of String values with css class names for left border
   */
  borderStyles(cell, row, col, topBorder, leftBorder) {
    let borderRow = row % 3 == false && row != 0 && row != 8;
    let borderCol = col % 3 == false && col != 0 && col != 8;
    if (borderRow) {
      this.setCssClassList(topBorder, cell);
    }
    if (borderCol) {
      this.setCssClassList(leftBorder, cell);
    }
  }

  /**
   * Create choices inside a cell and set cell.innerHTML with the chosen number
   * @param { object } event present but unnecessary in this method
   * @param { node } cell cell in which to create choices
   */
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

  /**
   * Compare selected number with solution matrix and check if choice is correct
   * @param { object } e event
   * @param { node } cell cell has id that matches it's position in solution matrix
   * @return { boolean } returns true for correct choice or false for incorrect
   */
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

  /**
   * Observe changes in innerHTML and remove choices when number selected
   * @param { node } cell from which to remove choices
   */
  cellObserver(cell) {
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

  /**
   * Set a list of css class names and set them to the element
   * @param { Array } cssClasses A list of String css class names
   * @param { node } element Element to which add css classes
   */
  setCssClassList(cssClasses, element) {
    cssClasses.forEach((css) => {
      element.classList.add(css);
    });
  }

  /**
   * Remove choices that already exist
   * @param { node } cell cell from which to remove choices
   */
  removeChoices(cell) {
    while (cell.lastChild.id == "choice-menu") {
      cell.removeChild(cell.lastChild);
    }
  }

  /**
   * Remove numbers from solved sudoku matrix and replace with zeros
   * @param { Number } numOfClues How many cells will be left filled (minimum 17)
   */
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
