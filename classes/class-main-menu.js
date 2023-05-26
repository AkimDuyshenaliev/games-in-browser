import { SudokuBoard } from "./class-sudoku-board.js";

// // Sudoku board from classes
// const board = new SudokuBoard(document);
// board.buildBoard("main");

export class MainMenu extends SudokuBoard {
  constructor(document) {
    super(document);
    this.document = document;
    this.difficulty = 17; //Number of clues on the board
    this.showIncorrect = true; //Show wrong choice right away
  }

  buildMenu(element, elementId) {
    let baseNode = this.document.createElement(element);
    baseNode.id = elementId;
    baseNode.classList.add("center");
    this.document.body.appendChild(baseNode);

    super.buildBoard(elementId);
  }
}
