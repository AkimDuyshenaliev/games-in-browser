import { SudokuBoard } from "./class-sudoku-board.js";

export class MainMenu extends SudokuBoard {
  constructor(document) {
    super(document);
    this.document = document;
    this.difficulty = 17; //Number of clues on the board
    this.showIncorrect = true; //Show wrong choice right away
  }

  /**
   * Create the main menu
   * @param { String } element DOM element to be used to contain everything (preferably DIV)
   * @param { String } elementId the ID od the the created element
   */
  buildMenu(element, elementId) {
    let baseNode = this.document.createElement(element);
    baseNode.id = elementId;
    baseNode.classList.add("center");

    let title = super.defineTitle("h2", "Sudoku difficulty");
    baseNode.appendChild(title);
    // Create range slider for difficulty
    let rangeSlider = this.sudokuDifficultyMenu(50, false);
    baseNode.appendChild(rangeSlider);

    this.document.body.appendChild(baseNode);
  }

  /**
   * Menu to chose options to start sudoku with
   * @param { Number } hints how many hints to leave on the board
   * @param { boolean } showMistakes true to show mistakes right away false to reveal them when finished
   */
  sudokuDifficultyMenu(hints, showMistakes) {
    let rangeSlider = this.document.createElement("input");
    rangeSlider.id = "range-slider";
    rangeSlider.type = "range";
    rangeSlider.min = 17;
    rangeSlider.max = 60;
    rangeSlider.value = rangeSlider.max / 2;
    rangeSlider.classList.add("slider");
    return rangeSlider;
  }

  startSudoku(elementId, hints) {
    super.buildBoard(elementId, hints);
  }
}
