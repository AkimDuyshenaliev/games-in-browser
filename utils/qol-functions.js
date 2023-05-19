export function createChoices(select, nums, selected = 0) {
  nums.forEach(function (choice) {
    var option = document.createElement("option");
    option.innerHTML = choice;
    option.setAttribute("value", choice);
    if (selected == choice) {
      option.selected = true;
      select.setAttribute("disabled", true);
    }
    select.appendChild(option);
  });
}

export function unsolveTheBoard(matrix, numOfClues) {

}