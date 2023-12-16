let gameOver = false;
let gameNumber = 0;
let timeAfterGame = 0;
let userGameTime = 60;
let userMinNumber = 1;
let userMaxNumber = 25;
let minSeq = 0;
let maxSeq = 10;


function getUserInput() {
    userGameTime = parseInt($("#game-time").val()) || 60;
    userMinNumber = parseInt($("#min-number").val()) || 1;
    userMaxNumber = parseInt($("#max-number").val()) || 25;
    minSeq =  parseInt($("#min-seq").val()) || 0;
    maxSeq =  parseInt($("#max-seq").val()) || 25;

    if(minSeq < 0 || minSeq > 25) {
        minSeq = 0;
    }

    if(maxSeq < 0 || maxSeq > 25) {
        maxSeq = 25
    }
}

function game() {
    const table = $("#game-table");
    const usedNumbers = new Set();
    let targetNumber = minSeq;
    let gameTimer = userGameTime;
    const timerElement = $("#timer");

    function getRandomUniqueNumber() {
        let randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * (userMaxNumber - userMinNumber + 1)) + userMinNumber;
        } while (usedNumbers.has(randomNumber));
        usedNumbers.add(randomNumber);
        return randomNumber;
    }

    for (let i = 0; i < 5; i++) {
        const row = $("<tr></tr>");
        for (let j = 0; j < 5; j++) {
            const cell = $("<td></td>").text(getRandomUniqueNumber());
            row.append(cell);
        }
        table.append(row);
    }

    function updateTimer() {
        timerElement.text(`Залишилось: ${gameTimer} секунд`);
        gameTimer--;

        if (gameTimer < 0) {
            alert("Час вичерпано! Гра закінчена");
            clearInterval(timerInterval);
        }
    }

    const timerInterval = setInterval(updateTimer, 1000);

    table.on("click", "td", function () {
        if (gameOver) {
            return;
        }

        const cell = $(this);
        const cellNumber = parseInt(cell.text());
        console.log(targetNumber)
        if (cellNumber === targetNumber) {
            cell.css({ backgroundColor: "green" });
            targetNumber++;

            if (targetNumber === maxSeq + 1) {
                alert("Знайдені усі числа! Ви перемогли");
                gameNumber += 1;
                timeAfterGame = userGameTime - gameTimer;
                clearInterval(timerInterval);
                startNewGame();
                return;
            }
        } else {
            $("#error-dialog").dialog("open");
            startNewGame();
        }
    });

    function startNewGame() {
        usedNumbers.clear();
        targetNumber = minSeq;
        gameTimer = userGameTime;
        updateTimer();

        table.empty();

        for (let i = 0; i < 5; i++) {
            const row = $("<tr></tr>");
            for (let j = 0; j < 5; j++) {
                const cell = $("<td></td>").text(getRandomUniqueNumber());
                row.append(cell);
            }
            table.append(row);
        }

        gameOver = false;
    }

    $("#end_game").on("click", function () {
        startNewGame();
    });
}

function displayGameResults() {
    const resultsTable = $("#game-results");
    const row = $("<tr></tr>");
    row.append($("<td></td>").text(gameNumber));
    row.append($("<td></td>").text(timeAfterGame));
    resultsTable.append(row);
}

function resetGame() {
    gameOver = true;
    gameNumber = 0;
    timeAfterGame = 0;
    $("#game-results tbody").empty();
    $("#game-results").hide();
}

$(document).ready(function () {
    
    $("#game-results").hide();

    $("#start_game").on("click", function () {
        getUserInput();
        resetGame();
        game();
    });

    $("#end_game").on("click", function () {
        resetGame();
    });

    $("#show_button").click(function () {
        displayGameResults();
        $("#game-results").show();
    });

    $("#error-dialog").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "OK": function () {
                $(this).dialog("close");
                resetGame();
            }
        }
    });
});
