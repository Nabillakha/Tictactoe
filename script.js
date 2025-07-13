const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const overlay = document.getElementById("overlay");
const playBtn = document.getElementById("play-button");
const temaButton = document.getElementById("tema");
const tipsButton = document.getElementById("tips-button");
const rulesButton = document.getElementById("rules-button");
const tips = document.getElementById('tips-bar');
const rules = document.getElementById('rules-bar');


let currentPlayer = 'X';
let gameActive = false;
let gameState = Array(9).fill('');

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

playBtn.addEventListener("click", () => {
    overlay.style.display = "none";
    gameActive = true;
    }
);
tipsButton.addEventListener("click", () => {
    tips.hidden = !tips.hidden;
    if(rules.hidden !== true) rules.hidden = true;
});
rulesButton.addEventListener("click", () => {
    rules.hidden = !rules.hidden;
    if(tips.hidden !== true) tips.hidden = true; 
});
function handleClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || gameState[index] !== '') return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (!gameState.includes('')) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  return winningCombinations.some(combo => {
    const [a, b, c] = combo;
    return (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    );
  });
}

function restartGame() {
  gameState.fill('');
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => (cell.textContent = ''));
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);