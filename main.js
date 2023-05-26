import { sudokuBoard } from "./utils/sudoku-board.js";
import { SudokuBoard } from "./classes/class-sudoku-board.js";
import { MainMenu } from "./classes/class-main-menu.js";

// Sudoku board from a function
// sudokuBoard(); 

// Sudoku board from classes
// const board = new SudokuBoard(document);
// board.buildBoard("main", 17);

// Main menu before the game
const menu = new MainMenu(document);
menu.buildMenu("div", "main")
