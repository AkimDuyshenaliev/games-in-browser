import { SudokuBoard } from "./class-sudoku-board.js";

export class MainMenu extends SudokuBoard {
  constructor(document, window) {
    super(document);
    this.document = document;
    this.window = window;
    this.difficulty = 17; //Number of clues on the board
    this.showIncorrect = true; //Show wrong choice right away
  }

  /**
   * Create the base container for elements
   * @param { String } element DOM element to be used to contain everything (preferably DIV)
   * @param { String } elementId the ID od the the created element
   */
  defineBase(element, elementId) {
    let baseNode = this.document.createElement(element);
    baseNode.id = elementId;
    baseNode.classList.add("center");

    this.document.body.appendChild(baseNode);
  }

  /**
   * Create a title element for the sudoku board
   * @param { node || String } parent DOM or ID of the element to which append "title" element
   * @param { String } element type of DOM element to use to create title
   * @param { String } text text of the title
   * @return { node } node title element with selected text
   */
  defineTitle(parent, element, text) {
    let title = this.document.createElement(element);
    title.innerHTML = text;

    this.appendObjectOrId(parent, title);
    return title;
  }

  /**
   * A slider with custom min and max value and index
   * @param { node } parent DOM element to which append "rangeSlider" element
   * @param { Number } min minimum value the slider will take
   * @param { Number } max maximum value the slider will take
   * @return { node } returns the range slider DOM element
   */
  rangeSlider(parent, index, min, max) {
    let rangeSlider = this.document.createElement("input");
    rangeSlider.id = index;
    rangeSlider.type = "range";
    rangeSlider.min = min;
    rangeSlider.max = max;
    rangeSlider.value = (max + min) / 2;
    rangeSlider.classList.add("range-slider");

    let update = () => (this.difficulty = rangeSlider.value);

    rangeSlider.addEventListener("input", update);
    update();

    this.appendObjectOrId(parent, rangeSlider);
    return rangeSlider;
  }

  /**
   * Create button
   * @param { node } parent is an object to which this button needs to be added
   * @param { String || Number } id index of the button
   * @param { String } innerText text that is written on the button
   * @return { node } the button element
   */
  createButton(parent, id, innerText) {
    let base = this.document.createElement("div");
    base.id = id;
    base.innerText = innerText;
    base.classList.add("button");

    this.appendObjectOrId(parent, base);
    return base;
  }

  /**
   * A method for creating switch toggle
   * @param { node || String } parent parent element to which append created switch
   * @param { String } id value to use as id for the switch
   * @param { String } text value to use for the text above the switch
   * @return { node } the created toggle switch
   */
  toggleSwitch(parent, id) {
    let label = this.document.createElement("label");
    let input = this.document.createElement("input");
    let slider = this.document.createElement("div");

    label.classList.add("switch");
    input.type = "checkbox";
    slider.classList.add("toggle-slider");

    label.appendChild(input);
    label.appendChild(slider);

    this.appendObjectOrId(parent, label);
    return label;
  }

  /**
   * Check if parent is an object (node) or a string (id) and take appropriate action to append child
   * to it
   * @param { node || String } parent parent element to be evaluated
   * @param { node } child the element to be appended
   */
  appendObjectOrId(parent, child) {
    if (typeof parent == "object") {
      parent.appendChild(child);
    } else if (typeof parent == "string") {
      this.elementById(parent).appendChild(child);
    }
  }

  /**
   * A short to get element from DOM by ID
   * @param { String } id the ID of the DOM element
   * @return { node } result of the search
   */
  elementById(id) {
    return this.document.getElementById(id);
  }
}
