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
  const changeName = function (newName) {
    this.name = newName;
  };
  return { name, type, changeName: changeName };
};

// Default players

const playerOne = playerFactory("Player One", "X");
const playerTwo = playerFactory("Player Two", "O");

// display module

const displayController = (function () {
  return {
    displayChangeNameForm,
    hideChangeNameForm,
  };

  function displayChangeNameForm(playerNumber) {
    document.getElementById("change_name_player_number").value = playerNumber;
    document.getElementById("change_name_form_container").style.display =
      "block";
  }

  function hideChangeNameForm() {
    document.getElementById("change_name_form_container").style.display =
      "none";
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
