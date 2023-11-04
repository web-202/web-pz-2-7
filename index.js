$(document).ready(function () {
    let currentNumber = 1;
    let countdown = 60;
    let timerInterval;
    let gameStarted = false;
    let gameCount = 0;
    let gameResults = [];
    let correctAnswers = 0;

    // Load previous game results from local storage
    if (localStorage.getItem("gameResults")) {
        gameResults = JSON.parse(localStorage.getItem("gameResults"));
    }

    $("#errorDialog").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "OK": function () {
                $(this).dialog("close");
                clearInterval(timerInterval);
                resetGame();
            }
        }
    });

    $("#congratulationsDialog").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "OK": function () {
                $(this).dialog("close");
                gameResults.push(60 - countdown);
                gameCount++;

                // Limit the stored game results to a maximum of 3 games
                if (gameResults.length > 3) {
                    gameResults.shift();
                }

                // Save the game results to local storage
                localStorage.setItem("gameResults", JSON.stringify(gameResults));

                if (gameCount < 3) {
                    resetGame();
                } else {
                    showResultsScreen();
                }
            }
        }
    });

    $("#startButton").on("click", function () {
        $("#screen1").hide();
        $("#screen2").show();
        startGame();
    });

    $(".startAgainButton").on("click", function () {
        resetGame();
    });

    $(".resetButton").on("click", function () {
        $("#screen3").hide();
        $("#screen2").show();
        resetGame();
    });


    function startGame() {
        gameStarted = true;
        generateGameBoard();
        updateTimer();
    }

    function generateGameBoard() {
        const gameBoard = $("#gameBoard");

        for (let i = 1; i <= 25; i++) {
            const cell = $("<div>", { class: "cell", text: i });
            cell.css({
                "color": getRandomColor(),
                "font-family": getRandomFont(),
                "font-size": getRandomFontSize(),
                "height": getRandomHeight()
            });
            gameBoard.append(cell);
        }

        const cells = gameBoard.find(".cell");
        shuffleNumbers(cells);

        cells.on("click", function () {
            const cellValue = parseInt($(this).text());

            if (cellValue === currentNumber) {
                $(this).css("background-color", "lightgreen");
                currentNumber++;
                correctAnswers++;

                if (correctAnswers === 10) {
                    showPartialResult();
                    correctAnswers = 0;
                }
            } else {
                showErrorDialog();
            }
        });
    }

    function getRandomColor() {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }

    function getRandomFont() {
        const fonts = ["Arial", "Verdana", "Helvetica", "Times New Roman", "Georgia"];
        const randomIndex = Math.floor(Math.random() * fonts.length);
        return fonts[randomIndex];
    }

    function getRandomFontSize() {
        return Math.floor(Math.random() * 21 + 20) + "px";
    }

    function getRandomHeight() {
        return Math.floor(Math.random() * 51 + 50) + "px";
    }

    function shuffleNumbers(cells) {
        for (let i = cells.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cells[i].textContent, cells[j].textContent] = [cells[j].textContent, cells[i].textContent];
        }
    }

    function updateTimer() {
        timerInterval = setInterval(function () {
            countdown--;
            $("#countdown").text(countdown);

            if (countdown === 0) {
                clearInterval(timerInterval);
                gameResults.push(0);
                gameCount++;

                if (gameResults.length > 3) {
                    gameResults.shift();
                }

                localStorage.setItem("gameResults", JSON.stringify(gameResults));

                if (gameCount < 3) {
                    resetGame();
                } else {
                    showResultsScreen();
                }
            }
        }, 1000);
    }

    function showPartialResult() {
        const timeRemaining = countdown;
        gameResults.push(60 - timeRemaining);
        showResultsScreen();
    }

    function showResultsScreen() {
        $("#screen2").hide();
        $("#screen3").show();
        addResultRows();
        highlightBestResult();
    }

    function addResultRows() {
        const resultsTable = $("#resultsTable");
        resultsTable.empty();

        for (let i = 0; i < gameResults.length; i++) {
            const newRow = $("<tr>");
            const attemptCell = $("<td>").text(i + 1);
            const timeCell = $("<td>").text(gameResults[i] + " сeк.");
            newRow.append(attemptCell, timeCell);
            resultsTable.append(newRow);
        }
    }

    function highlightBestResult() {
        const rows = $("#resultsTable tr");
        let bestRow;
        let bestTime = Number.MAX_VALUE;

        rows.each(function () {
            const timeCell = $(this).find("td:nth-child(2)");
            const timeValue = parseInt(timeCell.text());

            if (timeValue < bestTime) {
                bestTime = timeValue;
                bestRow = $(this);
            }
        });

        if (bestRow) {
            bestRow.addClass("best-result");
        }
    }

    function showErrorDialog() {
        $("#errorDialog").dialog("open");
    }

    function showCongratulationsDialog() {
        $("#congratulationsDialog").dialog("open");
    }

    function resetGame() {
        gameStarted = false;
        currentNumber = 1;
        countdown = 60;
        $("#gameBoard .cell").css("background-color", "#f3f2f2e6");
        clearInterval(timerInterval);

        if (gameCount < 3) {
            $("#gameBoard").empty();
            generateGameBoard();
            updateTimer();
        } else {
            $("#screen2").hide();
            $("#screen1").show();
        }
    }
});