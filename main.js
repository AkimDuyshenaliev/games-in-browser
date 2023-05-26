import { sudokuBoard } from "./utils/sudoku-board.js";
import { SudokuBoard } from "./classes/class-sudoku-board.js";

// Sudoku board from a function
// sudokuBoard(); 

// Sudoku board from classes
const board = new SudokuBoard(document, "Pure node.js Sudoku");
board.buildBoard("main");
