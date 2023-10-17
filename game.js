const startButton = document.getElementById("start-game-button");
const resultsButton = document.getElementById("results-button");
const exitButton = document.getElementById("exit-button");
const numbersContainer = document.getElementById("numbers-container");
const message = document.getElementById("game-message");
const timerContainer = document.getElementById("game-timer");
let timer;

let gameStarted = false;
let sequence = [];
let gameSequence = [];

function updateTimer() {
    let currentTime = parseInt(timerContainer.textContent.split(': ')[1]);
    currentTime++;
    timerContainer.textContent = 'Час: ' + currentTime;

    if (currentTime >= 60) {
        stopGame("Час вийшов. Ви програли.");
    }
}

function startTimer() {
    timerContainer.textContent = 'Час: 0';
    timer = setInterval(updateTimer, 1000);
}

function stopTimer() {
    clearInterval(timer);
    timerContainer.textContent = 'Час: 0';
}

function generateGame() {
    numbersContainer.innerHTML = "";
   
}

function stopGame(messageText) {
    message.textContent = messageText;
    gameStarted = false;
    startButton.disabled = false;
    stopTimer();
}


startButton.addEventListener("click", () => {
    if (!gameStarted) {
        generateGame();
        gameSequence = [];
        startButton.disabled = true;
        gameStarted = true;
        sequence = Array.from({ length: 25 }, (_, i) => i + 1);
        shuffleArray(sequence);
        message.textContent = "";
        startTimer();
    }
});

exitButton.addEventListener("click", () => {
    numbersContainer.style.display = "none";
    startButton.disabled = false;
    gameStarted = false;
    numbersContainer.innerHTML = "";
    stopTimer();
});

resultsButton.addEventListener("click", () => {
    window.location = "result.html";
});



numbersContainer.addEventListener("click", (e) => {
    if (gameStarted && e.target.classList.contains("number-cell")) {
        const selectedNumber = parseInt(e.target.textContent);

        if (gameSequence.length === 0 || selectedNumber === gameSequence[gameSequence.length - 1] + 1) {
            gameSequence.push(selectedNumber);

            if (gameSequence.length === 10) {
                stopGame("Ви виграли!");
              
            }
        } else {
            stopGame("Ви програли. Спробуйте ще раз!");
        }
    }
});



function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
