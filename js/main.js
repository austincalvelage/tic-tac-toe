// variables
const squares = document.querySelectorAll('.square');
const startModal = document.querySelector('.startModal');
const playerRegisterForm = startModal.querySelector('.playerRegister');
const scoreboard = document.querySelector('.scoreboard');
const player1Name = scoreboard.querySelector('.player1Name');
const player2Name = scoreboard.querySelector('.player2Name');
const winModal = document.querySelector('.winModal');
const restartButton = winModal.querySelector('.restart');
const winningMessage = winModal.querySelector('.winningMessage');

let player1Score = 0;
let player1Moves = [];

let player2Score = 0;
let player2Moves = [];

let gameRound = 1;

const winningStates = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 6, 9],
  [3, 5, 7],
]

/**********
FUNCTIONS
***********/

function checkWinningMoves()
{
    winningStates.forEach(winningState => {
        const xWins = winningState.every(state => player1Moves.includes(state))
        const oWins = winningState.every(state => player2Moves.includes(state))

        if (xWins)
        {
            winModal.classList.remove('hidden');
            winningMessage.textContent = `${player1Name.textContent} is the winner!!`;
        }
        else if (oWins)
        {
          winModal.classList.remove('hidden');
          winningMessage.textContent = `${player2Name.textContent} is the winner!!`;

        }
    });
}

function playerRegisterHandler(event) {
  event.preventDefault();
  startModal.classList.add('hidden');
  const player1Input = playerRegisterForm.querySelector('.player1Input');
  const player2Input = playerRegisterForm.querySelector('.player2Input');
  player1Name.textContent = player1Input.value;
  player2Name.textContent = player2Input.value;

}

function gameOverHandler(event)
{
    event.preventDefault();
    winModal.classList.add('hidden');

    gameRound = 1;
    player1Moves = []
    player2Moves = []
    squares.forEach((square) => 
    {
        square.textContent = ""
    });
    
}


function clickHandler(event)
{
  console.log(`Round ${gameRound}`);

  if (gameRound < 10 && event.target.textContent == "")
  {
    if (gameRound % 2 != 0) {
        player1Moves.push(Number(event.target.id));
        console.log(player1Moves);
        event.target.textContent = 'X'
        gameRound++;
    }
    else if (gameRound % 2 == 0) {
        player2Moves.push(Number(event.target.id));
        console.log(player2Moves);
        event.target.textContent = 'O'
        gameRound++;
    }

    checkWinningMoves(player1Moves)
    }
}



playerRegisterForm.addEventListener('submit', playerRegisterHandler);
restartButton.addEventListener('click', gameOverHandler);
squares.forEach( square => square.addEventListener('click', clickHandler));