import { SudokuMatrixGenerator } from "./class-board-generator.js";

export class SudokuBoard extends SudokuMatrixGenerator {
  constructor(document, window) {
    super();

    this.document = document;
    this.window = window;
    this.baseElement = this.defineBase("div", "custom-select", [
      "flex-container",
    ]);
    this.choices = super.generateUniqueArray(0, 10);
    this.showErrors = false;
    this.matrix = super.sudokuMatrix();
    this.solution = JSON.parse(JSON.stringify(this.matrix));
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
   * Create the start button
   * @param { node } parent is an object to which this button needs to be added
   * @param { object } menu object holding MainMenu class
   * @return { node } the button element
   */
  startButton(parent, menu) {
    let base = this.document.createElement("div");
    base.id = "sudoku-game";
    base.innerText = "Sudoku";
    base.classList.add("button");

    base.addEventListener("click", (event) => {
      base.parentNode.firstChild.remove();
      base.remove();
      this.sudokuMenu(menu, parent);
    });

    menu.appendObjectOrId(parent, base);
    return base;
  }

  /**
   * Build the start menu for sudoku
   * @param { object } menu is the MainMenu class
   * @param { node || String } baseID is the ID or the object itself to which this menu to be added
   */
  sudokuMenu(menu, baseID) {
    let baseList = this.document.createElement("ul");
    baseList.style.setProperty("list-style-type", "none", "");

    let title = menu.defineTitle(baseList, "h2", "Sudoku difficulty");
    let slider = menu.rangeSlider(baseList, "sudoku-difficulty", 17, 60);
    let showErrors = menu.toggleSwitch(baseList, "show-errors", "Show errors");
    let errorsInput = showErrors.querySelector('input[type="checkbox"]');
    let runSudoku = menu.createButton(
      baseList,
      "sudoku-board",
      "Generate sudoku board"
    );

    showErrors.addEventListener("change", () => {
      if (errorsInput.checked) {
        this.showErrors = true;
        console.log(this.showErrors);
      } else {
        this.showErrors = false;
        console.log(this.showErrors);
      }
    });

    [title, slider, showErrors, runSudoku].forEach((element) => {
      let piece = this.document.createElement("li");
      piece.appendChild(element);
      baseList.appendChild(piece);
    });

    this.document.getElementById(baseID).appendChild(baseList);

    runSudoku.addEventListener("click", (sudokuBoardClick) => {
      baseList.remove();

      // Create a button to check user's answers for errors if showErrors == false
      if (this.showErrors == false) {
        let checkAnswers = menu.createButton(
          "main",
          "check-answers",
          "Check answers"
        );
        checkAnswers.addEventListener("click", () => {
          this.checkAnswersOnBoard();
        });
      }
      this.buildBoard("main", menu.difficulty, menu.createButton);
    });
  }

  /**
   * Main method that assembles the board, it starts and ends here
   * @param { String } mainElement the ID of the element in which to place the sudoku board
   * @param { Number } hints show how many hints to leave on the board
   * @param { object } createButton method from MainMenu class for creating a button
   */
  buildBoard(mainElement, hints) {
    hints < 17 ? (hints = 17) : hints; //Set minimum number of hints to 17
    this.unsolveTheBoard(hints);

    for (let row = 0; row < this.matrix.length; row++) {
      let rowBox = this.document.createElement("div");
      rowBox.classList.add("flex-container");

      for (let col = 0; col < this.matrix[row].length; col++) {
        let cell = this.document.createElement("div");
        cell.classList.add("flex-container-cells");

        this.cellLogic(row, col, cell, rowBox, ["pointer", "cell"]);

        this.borderStyles(cell, row, col, ["top-border"], ["left-border"]);
      }
      this.baseElement.appendChild(rowBox);
    }

    this.document.getElementById(mainElement).appendChild(this.baseElement);
  }

  /**
   * Method for creating a standard cell before any changes are done, preselected values
   * also are assigned here
   * @param { Number } row row in which this cell is places
   * @param { Number } col column in which this cell is places
   * @param { node } cell a div element to be configured
   * @param { node } rowBox a div element in which cells for the current row are being kept
   * @param { Array } cssClasses a list of String names of css classes
   */
  cellLogic(row, col, cell, rowBox, cssClasses) {
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

    this.setCssClassList(cssClasses, cell);
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
   * @param { boolean } showErrors defines wether to show incorrect choice right away or upon board completion
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
        this.choiceHandling(event, cell);
        cell.innerHTML = event.target.innerHTML;
      });

      select.appendChild(choice);
    }
    cell.appendChild(select);
  }

  /**
   * A method that determines what to do when wrong choice was made
   * @param { object } event from the event listener
   * @param { node } cell the cell where the action was taken
   */
  choiceHandling(event, cell) {
    if (this.showErrors == false) {
      cell.style.setProperty("background-color", "lightblue", "");
      return;
    }

    let check = this.checkIfCorrectCell(event, cell);
    if (this.showErrors == true && check == true) {
      this.paintCellCorrect(cell);
    } else if (this.showErrors == true && check == false) {
      this.paintCellWrong(cell);
    }
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
   * A method to check user's answers and mark incorrect ones red
   */
  checkAnswersOnBoard() {
    for (let row = 0; row < this.matrix.length; row++) {
      for (let col = 0; col < this.matrix[row].length; col++) {
        let cell = this.document.getElementById(row + "-" + col);
        if (Number(cell.innerHTML) == 0) {
          continue;
        } else if (Number(cell.innerHTML) != this.solution[row][col]) {
          this.paintCellWrong(cell);
        }
      }
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

  /**
   * Method to paint the cell in a color that shows it is correct
   * @param { node } cell the cell to be painted
   */
  paintCellCorrect(cell) {
    cell.style.setProperty("background-color", "lightblue", "");
  }

  /**
   * Method to paint the cell in a color that shows it is wrong
   * @param { node } cell the cell to be painted
   */
  paintCellWrong(cell) {
    cell.style.setProperty("background-color", "red", "");
  }
}
