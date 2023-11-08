const startButton = document.getElementById("startButton");
const resultsButton = document.getElementById("resultsButton");
const exitButton = document.getElementById("exitButton");
const gameContainer = document.getElementById("gameContainer");
const message = document.getElementById("message");
const timerContainer = document.getElementById("timer");
let timer;


let gameStarted = false;
let sequence = [];
let gameSequence = []

function updateTimer() {
    let currentTime = parseInt(timerContainer.textContent.split(': ')[1]);
    currentTime++;
    timerContainer.textContent = 'Time: ' + currentTime;
}

function startTimer() {
    timerContainer.textContent = 'Time: 0';
    timer = setInterval(updateTimer, 1000);
}

function stopTimer() {
    clearInterval(timer)
    timerContainer.textContent = 'Time: 0';
}


function generateGame() {
    gameContainer.innerHTML = ""
    const numbers = Array.from({length: 25}, (_, i) => i + 1);
    shuffleArray(numbers);

    for (let i = 0; i < 5; i++) {
        const row = document.createElement("div");
        row.className = "row";
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.textContent = numbers[i * 5 + j];
            cell.style.fontSize = Math.floor(Math.random() * 20 + 10) + "px";
            cell.style.color = getRandomColor();
            row.appendChild(cell);
        }
        gameContainer.appendChild(row);
    }

    gameContainer.style.display = "grid";
    gameContainer.style.gridTemplateColumns = "1fr 1fr 1fr 1fr 1fr";
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

startButton.addEventListener("click", () => {
    if (!gameStarted) {
        generateGame();
        gameSequence = []
        startButton.disabled = true;
        gameStarted = true;
        sequence = Array.from({length: 25}, (_, i) => i + 1);
        shuffleArray(sequence);
        message.textContent = "";
        startTimer()
    }
});

exitButton.addEventListener("click", () => {
    gameContainer.style.display = "none";
    startButton.disabled = false;
    gameStarted = false;
    gameContainer.innerHTML = "";
    stopTimer()
});

resultsButton.addEventListener("click", () => {
    window.location = "result.html"
})

gameContainer.addEventListener("click", (e) => {
    if (gameStarted && e.target.classList.contains("cell")) {
        const selectedNumber = parseInt(e.target.textContent);

        if (gameSequence.length === 0) {
            gameSequence.push(selectedNumber)
            return
        }

        if (Math.abs(selectedNumber - gameSequence[gameSequence.length - 1]) !== 1 || gameSequence.includes(selectedNumber)) {
            message.textContent = "You lost. Try again!";
            gameStarted = false;
            startButton.disabled = false;
            stopTimer()
            return;
        }

        gameSequence.push(selectedNumber)

        if (gameSequence.length === 10) {
            message.textContent = "You win!";
            gameStarted = false;
            startButton.disabled = false;

            let results = []
            let gameId = "Game 1"

            if(localStorage.getItem("results")) {
                results = JSON.parse(localStorage.getItem("results"))
                gameId = "Game " + parseInt(results[results.length - 1].id.split(" ")[1]) + 1
            }

            let time = timerContainer.textContent.split(" ")[1]

            results.push({
                id: gameId,
                time
            })

            localStorage.setItem("results", JSON.stringify(results))

            stopTimer()
        }
    }

});
