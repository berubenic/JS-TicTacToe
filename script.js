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

const Player = (name, type) => {
  return { name, type };
};

// Default players

const playerOne = new Player("Player One", "X");
const playerTwo = new Player("Player Two", "O");
