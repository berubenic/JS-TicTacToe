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

// Display module

const displayController = (function () {
  const displayPlayerNames = function () {
    const playerOneHeader = document.getElementById("player_one");
    const playerTwoHeader = document.getElementById("player_two");
    playerOneHeader.appendChild(document.createTextNode(playerOne.name));
    playerTwoHeader.appendChild(document.createTextNode(playerTwo.name));
  };

  return { displayPlayerNames: displayPlayerNames };
})();

displayController.displayPlayerNames();
