import { sudokuBoard } from "./utils/sudoku-board.js";
import { SudokuBoard } from "./classes/class-sudoku-board.js";

// sudokuBoard();
const board = new SudokuBoard(document, "Pure node.js Sudoku");
board.buildBoard("main");
