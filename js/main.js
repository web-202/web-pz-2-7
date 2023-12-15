let instructionRead = false;
let gameOver = false;
let gameNumber = 0;
let timeAfterGame = 0;

let column = 0;
let row = 0;


function game() {
    const table = $("#game-table");
    const usedNumbers = new Set();
    let targetNumber = 1;
    let gameTimer = 60;
    const timerElement = $("#timer");
    var colors = ["blue", "yellow", "red", "darkgrey", "purple"];
    var size = ["20px", "25px", "15px", "10px", "30px"]

    function getRandomUniqueNumber() {
        let randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * 25) + 1;
        } while (usedNumbers.has(randomNumber));
        usedNumbers.add(randomNumber);
        return randomNumber;
    }

    for (let i = 0; i < 5; i++) {
        const row = $("<tr></tr>");
        for (let j = 0; j < 5; j++) {
            const cell = $("<td></td>").text(getRandomUniqueNumber());
            const randomColor = colors[Math.floor(Math.random() * colors.length + 1)];
            const randomSize = size[Math.floor(Math.random() * size.length + 1)];
            cell.css({color: randomColor, fontSize: randomSize})
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

    table.on("click", "td", function() {
        if (gameOver) {
            return;
        }

        const cell = $(this);
        const cellNumber = parseInt(cell.text());

        if (cellNumber === targetNumber) {
            cell.css({ backgroundColor: "green", fontSize: "20px" });
            targetNumber++;

            if (targetNumber === 6) {
                alert("Знайдені усі числа! Ви перемогли");
                gameNumber += 1
                timeAfterGame = 60 - gameTimer
                clearInterval(timerInterval);
                startNewGame();
            }
        } else {
            $("#error-dialog").dialog("open");
            startNewGame();
        }
    });
    function startNewGame() {
        usedNumbers.clear();
        targetNumber = 1;
        gameTimer = 60;
        updateTimer();

        table.empty();

        for (let i = 0; i < 5; i++) {
            const row = $("<tr></tr>");
            for (let j = 0; j < 5; j++) {
                const cell = $("<td></td>").text(getRandomUniqueNumber());
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                const randomSize = size[Math.floor(Math.random() * size.length)];
                cell.css({color: randomColor, fontSize: randomSize})
                row.append(cell);
            }
            table.append(row);
        }

        gameOver = false;
    };
    $("#end_game").on("click", function() {
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


function startNewGame(rows, columns) {
  const table = $("#game-table");
  const usedNumbers = new Set();
  let targetNumber = 1;
  let gameTimer = 60;
  const timerElement = $("#timer");
  const colors = ["blue", "yellow", "red", "darkgrey", "purple"];
  const size = ["20px", "25px", "15px", "10px", "30px"];

  table.empty();

  function getRandomUniqueNumber() {
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * (rows * columns)) + 1;
    } while (usedNumbers.has(randomNumber));
    usedNumbers.add(randomNumber);
    return randomNumber;
  }

  for (let i = 0; i < rows; i++) {
    const row = $("<tr></tr>");
    for (let j = 0; j < columns; j++) {
      const cell = $("<td></td>").text(getRandomUniqueNumber());
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomSize = size[Math.floor(Math.random() * size.length)];
      cell.css({ color: randomColor, fontSize: randomSize });
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

  table.on("click", "td", function() {
    if (gameOver) {
      return;
    }

    const cell = $(this);
    const cellNumber = parseInt(cell.text());

    if (cellNumber === targetNumber) {
      cell.css({ backgroundColor: "green", fontSize: "20px" });
      targetNumber++;

      if (targetNumber === rows * columns + 1) {
        alert("Знайдені усі числа! Ви перемогли");
        gameNumber += 1;
        timeAfterGame = 60 - gameTimer;
        clearInterval(timerInterval);
        startNewGame(rows, columns);
      }
    } else {
      $("#error-dialog").dialog("open");
      startNewGame(rows, columns);
    }
  });

  $("#end_game").on("click", function() {
    startNewGame(rows, columns);
  });

  gameOver = false;
}



$(document).ready(function(){
  $("#game-results").hide();
  $("#show_button").click(function () {
    $("#game-results").show();
  });

  $("#start_game").on("click", function() {
    const rows = parseInt($("#rows").val());
    const columns = parseInt($("#columns").val());
    startNewGame(rows, columns);
  });
});

$("#error-dialog").dialog({
  autoOpen: false,
  modal: true,
  buttons: {
    "OK": function() {
      $(this).dialog("close");
      resetGame();
    }
  }
});

