// 12 global variables representing each player's move types and values
let playerOneMoveOneType,
    playerOneMoveTwoType,
    playerOneMoveThreeType,
    playerOneMoveOneValue,
    playerOneMoveTwoValue,
    playerOneMoveThreeValue,
    playerTwoMoveOneType,
    playerTwoMoveTwoType,
    playerTwoMoveThreeType,
    playerTwoMoveOneValue,
    playerTwoMoveTwoValue,
    playerTwoMoveThreeValue,
    playerOneWins,
    playerTwoWins;

// function to set correct move variables
const setPlayerMoves = (player, moveOneType, moveOneValue, moveTwoType, moveTwoValue, moveThreeType, moveThreeValue) => {
    // check if move types are valid
    if (!moveOneType || !moveOneValue || !moveTwoType || !moveTwoValue ||
        !moveThreeType || !moveThreeValue) {
      return;
    }
    
    if (!isValidMoveType(moveOneType) ||
        !isValidMoveType(moveTwoType) ||
        !isValidMoveType(moveThreeType)) {
      return;
    }
  
    if (!isValidMoveValue(moveOneValue) ||
        !isValidMoveValue(moveTwoValue) ||
        !isValidMoveValue(moveThreeValue)) {
      return;
    }

    if ((moveOneValue + moveTwoValue + moveThreeValue) > 99) {
        return;
      }
    
    // assign move types and values to players
    if (player === 'Player One') {
        playerOneMoveOneType = moveOneType;
        playerOneMoveOneValue = moveOneValue;
        playerOneMoveTwoType = moveTwoType;
        playerOneMoveTwoValue = moveTwoValue;
        playerOneMoveThreeType = moveThreeType;
        playerOneMoveThreeValue = moveThreeValue;
    } else if (player === 'Player Two') {
        playerTwoMoveOneType = moveOneType;
        playerTwoMoveOneValue = moveOneValue;
        playerTwoMoveTwoType = moveTwoType;
        playerTwoMoveTwoValue = moveTwoValue;
        playerTwoMoveThreeType = moveThreeType;
        playerTwoMoveThreeValue = moveThreeValue;
    }
}
// helper function to evaluate if move type is valid
function isValidMoveType(moveType) {
    return (moveType === 'rock') ||
           (moveType === 'paper') ||
           (moveType === 'scissors');
}
// helper function to evaluate if move has valid value
function isValidMoveValue(moveValue) {
    return (moveValue >= 1) && (moveValue <= 99);
}

// function to compare player moves in a round
const getRoundWinner = roundNumber => {
    switch(roundNumber) {
        case 1:
          return getMoveWinner(playerOneMoveOneType,
                               playerOneMoveOneValue,
                               playerTwoMoveOneType,
                               playerTwoMoveOneValue);
        case 2:
          return getMoveWinner(playerOneMoveTwoType,
                               playerOneMoveTwoValue,
                               playerTwoMoveTwoType,
                               playerTwoMoveTwoValue);
        case 3:
          return getMoveWinner(playerOneMoveThreeType,
                               playerOneMoveThreeValue,
                               playerTwoMoveThreeType,
                               playerTwoMoveThreeValue);
        default:
          return null;
    }
}
// helper function to evaluate player moves and return the victor
function getMoveWinner(playerOneMoveType, playerOneMoveValue, playerTwoMoveType,
    playerTwoMoveValue) {
    if (!playerOneMoveType || !playerOneMoveValue || !playerTwoMoveType ||!playerTwoMoveValue) {
        return null;
    }
    // same move type, compare values
    if (playerOneMoveType === playerTwoMoveType) {
        if (playerOneMoveValue > playerTwoMoveValue) {
            return 'Player One';
        } else if (playerOneMoveValue < playerTwoMoveValue) {
            return 'Player Two';
        } else {
            return 'Tie';
        }
    }
    // different move types, no need to compare values
    if (playerOneMoveType === 'rock') {
        // rock vs scissors
        if (playerTwoMoveType === 'scissors') {
            return 'Player One';
        } else {
            // rock vs paper
            return 'Player Two';
        }
    } else if (playerOneMoveType === 'paper') {
        // paper vs rock
        if (playerTwoMoveType === 'rock') {
            return 'Player One';
        } else {
            // paper vs scissors
            return 'Player Two';
        }
    } else {
        // scissors vs paper
        if (playerTwoMoveType === 'paper') {
            return 'Player One';
        } else {
            // scissors vs rock
            return 'Player Two';
        }
    }
}
// function to evaluate winner of game
const getGameWinner = () => {
    if (!playerOneMoveOneType || !playerOneMoveTwoType ||
        !playerOneMoveThreeType || !playerOneMoveOneValue ||
        !playerOneMoveTwoValue || !playerOneMoveThreeValue ||
        !playerTwoMoveOneType || !playerTwoMoveTwoType ||
        !playerTwoMoveThreeType || !playerTwoMoveOneValue ||
        !playerTwoMoveTwoValue || !playerTwoMoveThreeValue) {
      return null;
    }
    playerOneWins = 0;
    playerTwoWins = 0;
  
    const roundOneWinner = getRoundWinner(1);
    const roundTwoWinner = getRoundWinner(2);
    const roundThreeWinner = getRoundWinner(3);
  
    addWin(roundOneWinner);
    addWin(roundTwoWinner);
    addWin(roundThreeWinner);
    if (playerOneWins > playerTwoWins) {
      return 'Player One';
    } else if (playerOneWins < playerTwoWins) {
      return 'Player Two';
    } else {
      return 'Tie';
    }
}
// helper function to update round wins
function addWin(winner) {
    if (winner === 'Player One') {
      playerOneWins = (playerOneWins + 1) || 1;
    } else if (winner === 'Player Two') {
      playerTwoWins = (playerTwoWins + 1) || 1;
    }
}
// function to set computer moves
const setComputerMoves = () => {
    const moves = ['rock', 'paper', 'scissors'];
    const moveOneType = moves[Math.floor(Math.random() * 3)];
    const moveTwoType = moves[Math.floor(Math.random() * 3)];
    const moveThreeType = moves[Math.floor(Math.random() * 3)];
    const moveOneValue = Math.floor(Math.random() * 96) + 1;
    const moveTwoValue = Math.floor(Math.random() * (97 - moveOneValue)) + 1;
    const moveThreeValue = 99 - moveOneValue - moveTwoValue;
    setPlayerMoves('Player Two', moveOneType, moveOneValue, moveTwoType,
                   moveTwoValue, moveThreeType, moveThreeValue);
}