export function createChoices(event, choices, cell, matrix) {
  let select = document.getElementById("choice-menu");
  if (select != null) { // Check if select box exists
    removeChoices(cell);
  } else {
    select = document.createElement("div");
    select.id = "choice-menu";
    select.classList.add("options-flex-container");
  }

  for (let i = 1; i < choices.length; i++) {
    let choice = document.createElement("div");
    choice.id = "choice";
    choice.innerHTML = choices[i];
    choice.addEventListener("click", (event) => {
      if (checkIfCorrect(event, cell, matrix) == true) {
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

export function removeChoices(cell) {
  while (cell.lastChild.id == "choice-menu") {
    cell.removeChild(cell.lastChild);
  }
}

export function cellObserver(choices, cell) {
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
        removeChoices(cell);
        simpleCounter == 1 ? (simpleCounter = 0) : simpleCounter++;
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(cell, observerConfig);
}

export function unsolveTheBoard(matrix, numOfClues) {
  let numsToThrowout = 9 * 9 - numOfClues;

  while (numsToThrowout != 0) {
    let randRow = Math.floor(Math.random() * (8 - 0 + 1 + 0));
    let randCol = Math.floor(Math.random() * (8 - 0 + 1 + 0));

    if (matrix[randRow][randCol] != 0) {
      matrix[randRow][randCol] = 0;
      numsToThrowout--;
    }
  }
}

export function checkIfCorrect(e, cell, matrix) {
  let row = Number(cell.id.slice(0, 1));
  let col = Number(cell.id.slice(2, 3));
  let choice = Number(e.target.innerHTML);
  if (matrix[row][col] == choice) {
    return true;
  } else {
    return false;
  }
}
