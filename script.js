// Board module

const gameBoard = (function () {
  let board = document.querySelectorAll(".row");

  return { board, addPlayToBoard, resetBoard };

  function addPlayToBoard(cell) {
    let player = gameController.currentPlayer();
    let playerType = player.type;
    if (_isCellOccupied(cell)) {
      return gameController.cellAlreadyOccupied();
    }
    cell.innerHTML = playerType;
    if (_isWinningSequence(playerType)) {
      return gameController.gameWon(player);
    } else if (_isTie()) {
      return gameController.gameTie();
    }
    gameController.changeTurn();
  }

  function resetBoard() {
    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
      let cells = board[rowIndex].children;
      for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
        cells[cellIndex].innerHTML = "";
      }
    }
    gameController.resetPlayerTurn();
  }

  function _isTie() {
    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
      let cells = board[rowIndex].children;
      for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
        if (cells[cellIndex].innerHTML === "") {
          return false;
        }
      }
    }
    return true;
  }

  function _isCellOccupied(cell) {
    if (cell.innerHTML === "") {
      return false;
    }
    return true;
  }

  function _isWinningSequence(winningType) {
    if (_isRowWin(winningType)) {
      return true;
    } else if (_isColWin(winningType)) {
      return true;
    } else if (_isDiagWin(winningType)) {
      return true;
    }
    return false;
  }

  function _isRowWin(winningType) {
    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
      cells = board[rowIndex].children;
      if (innerLoop(winningType, cells)) {
        return true;
      }
    }
    return false;

    function innerLoop(winningType, cells) {
      for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
        if (cells[cellIndex].innerHTML !== winningType) {
          return false;
        }
      }
      return true;
    }
  }

  function _isColWin(winningType) {
    for (let colIndex = 0; colIndex < board.length; colIndex++) {
      let rows = [board[0].children, board[1].children, board[2].children];
      if (innerLoop(rows, colIndex, winningType)) {
        return true;
      }
    }
    function innerLoop(rows, colIndex, winningType) {
      for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        if (rows[rowIndex][colIndex].innerHTML !== winningType) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  function _isDiagWin(winningType) {
    let rows = [board[0].children, board[1].children, board[2].children];
    if (
      rows[0][0].innerHTML === winningType &&
      rows[1][1].innerHTML === winningType &&
      rows[2][2].innerHTML === winningType
    ) {
      return true;
    } else if (
      rows[0][2].innerHTML === winningType &&
      rows[1][1].innerHTML === winningType &&
      rows[2][0].innerHTML === winningType
    ) {
      return true;
    }
    return false;
  }
})();

// Player factory

const playerFactory = (name, type) => {
  return { name, type };
};

// Default players

let playerOne = playerFactory("Player One", "X");
let playerTwo = playerFactory("Player Two", "O");

// game moduler

const gameController = (function () {
  let playerTurn = 1;
  let announcementHeader = document.getElementById("game_announcement");

  return {
    currentPlayer,
    gameTie,
    gameWon,
    changeTurn,
    resetPlayerTurn,
  };

  function resetPlayerTurn() {
    playerTurn = 1;
    announcementHeader.innerHTML = "";
  }

  function currentPlayer() {
    if (playerTurn === 1) {
      return playerOne;
    } else if (playerTurn === 2) {
      return playerTwo;
    }
  }

  function changeTurn() {
    if (playerTurn === 1) {
      playerTurn = 2;
    } else {
      playerTurn = 1;
    }
  }

  function gameTie() {
    announcementHeader.innerHTML = "Oh no! It's a tie!";
  }

  function gameWon() {
    player = currentPlayer();
    console.log(player);
    announcementHeader.innerHTML = `Boom! ${player.name} wins!`;
  }
})();

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
    hideChangeNameForm();
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

(function eventListeners() {
  let board = gameBoard.board;
  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    let row = board[rowIndex];
    let cells = row.children;
    for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
      let cell = cells[cellIndex];
      cells[cellIndex].addEventListener("click", function () {
        gameBoard.addPlayToBoard(cell);
      });
    }
  }
})();

const resetGameBtn = document
  .getElementById("reset_game_btn")
  .addEventListener("click", gameBoard.resetBoard);
