export function createChoices(event, choices, cell) {
  let select = document.getElementById("choice-menu");
  if (select != null) {
    removeChoices();
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
      cell.style.setProperty("background-color", "lightblue", "");
      cell.innerHTML = event.target.innerHTML;
    });

    select.appendChild(choice);
  }
  cell.appendChild(select);
}

export function removeChoices() {
  let select = document.getElementById("choice-menu");
  while (select.firstChild) {
    select.removeChild(select.firstChild);
  }
}

export function cellObserver(cell) {
  const observerConfig = { characterData: true, childList: true };
  const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
      if (
        mutation.type === "childList" &&
        mutation.previousSibling != null &&
        mutation.removedNodes.length == 0
      ) {
        removeChoices();
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

export function checkIfCorrect(e, matrix) {
  console.log("Cell " + e.target.id + ", value " + e.target.value);
  let row = Number(e.target.id.slice(0, 1));
  let col = Number(e.target.id.slice(2, 3));
  let choice = Number(e.target.value);
  if (choice == 0) {
    return true;
  }
  if (matrix[row][col] != choice) {
    return false;
  }
  return true;
}
