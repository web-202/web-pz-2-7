let instructionRead = false;
let gameOver = false;
function documentsReady(){

}
function ShowInstruction(){
    alert("Правила гри, ви маєте таблицю 5х5, вам потрібно обрати числа в послідовності від 1 до 10, якщо ви оберете не правильне число то гра почнеться с початку, якщо не встигнете по часу то також гра почнеться спочатку, Гарної гри!!!")
    instructionRead = true; 
    game(); 
}

function game() {
    const table = $("#game-table");
    const usedNumbers = new Set();
    let targetNumber = 1; 
    let gameTimer = 60; 
    const timerElement = $("#timer");
    var colors = ["blue", "yellow", "red", "pink", "purple"];
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
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const randomSize = size[Math.floor(Math.random() * size.length)];
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
    
            if (targetNumber === 11) {
                alert("Знайдені усі числа! Ви перемогли");
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


