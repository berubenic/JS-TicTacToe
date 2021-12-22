// Board module

const gameBoard = (function () {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  return { board };
})();

// Player factory

const playerFactory = (name, type) => {
  return { name, type };
};

// Default players

let playerOne = playerFactory("Player One", "X");
let playerTwo = playerFactory("Player Two", "O");

// display module

const displayController = (function () {
  return {
    displayChangeNameForm,
    hideChangeNameForm,
    updatePlayerName,
  };

  function updatePlayerName() {
    let name = document.getElementById("name").value;
    let playerNumber = document.getElementById(
      "change_name_player_number"
    ).value;

    if (playerNumber === "1") {
      playerOne.name = name;
    } else if (playerNumber === "2") {
      playerTwo.name = name;
    }

    _updatePlayerHeaders();
  }

  function displayChangeNameForm(playerNumber) {
    document.getElementById("change_name_player_number").value = playerNumber;
    document.getElementById("change_name_form_container").style.display =
      "block";
  }

  function hideChangeNameForm() {
    document.getElementById("change_name_form_container").style.display =
      "none";
  }

  function _updatePlayerHeaders() {
    let playerOneHeader = document.getElementById("player_one");
    let playerTwoHeader = document.getElementById("player_two");

    playerOneHeader.innerHTML = playerOne.name;
    playerTwoHeader.innerHTML = playerTwo.name;
  }
})();

// Listeners
const changePlayerOneNameBtn = document
  .getElementById("player_one_change_name_btn")
  .addEventListener("click", function () {
    displayController.displayChangeNameForm(1);
  });
const changePlayerTwoNameBtn = document
  .getElementById("player_two_change_name_btn")
  .addEventListener("click", function () {
    displayController.displayChangeNameForm(2);
  });
const cancelChangeNameBtn = document
  .getElementById("cancel_change_name_btn")
  .addEventListener("click", displayController.hideChangeNameForm);
const submitChangeNameBtn = document
  .getElementById("submit_change_name_btn")
  .addEventListener("click", displayController.updatePlayerName);
