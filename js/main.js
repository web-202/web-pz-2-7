let instructionRead = false;
let gameOver = false;
let gameNumber = 0;
let timeAfterGame = 0;


function game() {
    const table = $("#game-table");
    const usedNumbers = new Set();
    let targetNumber = 10; 
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
            
            targetNumber += 2;
        
            if (targetNumber === 24) {
                gameNumber += 1;
                timeAfterGame = 60 - gameTimer;
                alert(`Знайдені усі числа! Ви перемогли!\Час: ${timeAfterGame} секунд`);
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


$(document).ready(function(){
    game();
    $("#game-results").hide();
    $("#show_button").click(function () {
        $("#game-results").show();
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
$("#instruction").on("click", function() {
    startGameAfterInstruction(); 
});



