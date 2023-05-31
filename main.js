import { sudokuBoard } from "./utils/sudoku-board.js";
import { SudokuBoard } from "./classes/class-sudoku-board.js";
import { MainMenu } from "./classes/class-main-menu.js";

// Sudoku board from a function
// sudokuBoard();

// Sudoku board from classes
// const board = new SudokuBoard(document);
// board.buildBoard("main", 17);

// Main menu before the game
let baseID = "main";

const sudoku = new SudokuBoard(document, window);
const menu = new MainMenu(document, window);
menu.defineBase("div", baseID);

menu.defineTitle(baseID, "h2", "Choose a game");
sudoku.startButton(baseID, menu);

