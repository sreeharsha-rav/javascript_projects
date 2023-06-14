let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

// Write your code below:
function generateTarget() {
  // function to generate a random target number
  return Math.floor(Math.random() * 10);
}

function compareGuesses(humanGuess, computerGuess, target) {
  // function compares guesses b/w human user and computer
  if (humanGuess > 9 || humanGuess < 0) {
    alert('Number out of range!');
  } else {
    // absolute value of differences
    let humanDiff = Math.abs(humanGuess - target);
    let computerDiff = Math.abs(computerGuess - target);
    if (humanDiff <= computerDiff) {
      return true;  // human wins
    } else {
      return false; // computer wins
    }
  }
}

function updateScore(winner) {
  // function updates score of the winner
  if (winner === 'human'){
    humanScore++;
  } else if (winner === 'computer'){
    computerScore++;
  }
}

const advanceRound = () => currentRoundNumber++;  // move to next round