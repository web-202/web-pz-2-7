$(document).ready(function () {
    var numbers = Array.from({ length: 25 }, (_, i) => i + 1);
    shuffleArray(numbers);
    var storedResults = localStorage.getItem("gameResults");
    var currentIndex = 0;
    var timerInterval;
    var startTime;
    var gameResults = [];
    var storedResults = localStorage.getItem("gameResults");
    var colors = ["#FF5733", "#FFD133", "#33FF57", "#33C0FF", "#8333FF", "#FF33AE", "#8C33FF", "#33FFC0", "#33FFF5", "#FF33DD", "#33FF96", "#FF3365", "#33FF30", "#F7FF33", "#FF33D0", "#33FFEC", "#338BFF", "#3374FF", "#FF338E", "#33FF57", "#FFB933", "#FF5733", "#33FF57", "#33C0FF", "#8333FF"];

    if (storedResults) {
        gameResults = JSON.parse(storedResults);

        
        updateResultsTable();
    }
    

    function applyRandomColor(cell) {
        cell.css("background-color", getRandomColor());
    }
    
    function startTimer() {
        timerInterval = setInterval(function () {
            var currentTime = new Date().getTime();
            var elapsedTime = currentTime - startTime;
            var minutes = Math.floor((elapsedTime / 1000) / 60);
            var seconds = Math.floor((elapsedTime / 1000) % 60);
            var formattedTime = padZero(minutes) + ":" + padZero(seconds);
            $("#timer").text(formattedTime);
        }, 1000);
    }
   
    
    function stopTimer() {
        clearInterval(timerInterval);
    }

    function resetTimer() {
        clearInterval(timerInterval);
        $("#timer").text("00:00");
    }

    $("#startButton").on("click", function () {
        $("#screen1").hide();
        $("#screen2").show();
        resetGrid();
        startTimer();
    });

    $("#restartButton").on("click", function () {
        $("#screen2").show();
        $("#screen3").hide();
        resetGrid();
        resetTimer(); 
        startTimer(); 
    });

    $("#resultDialog").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "Закрити": function () {
                $(this).dialog("close");
            }
        }
    });

    $("#showResults").on("click", function () {
        $("#screen2").hide();
        $("#screen3").show();
        stopTimer();
        
    });

    function resetGrid() {
        $("#error-message").text("");
        $(".cell").remove();
        shuffleArray(numbers);
        currentIndex = 0;
        startTime = new Date().getTime(); 
        for (var i = 0; i < 25; i++) {
            var number = numbers[i];
            var cell = $("<div>").addClass("cell").text(number);
            applyRandomColor(cell); 
            $("#grid").append(cell);

            cell.on("click", function () {
                var selectedNumber = parseInt($(this).text());
                if (selectedNumber === currentIndex + 1) {
                    currentIndex++;
                    $(this).css("background-color", "green");
                    if (currentIndex === 5) {
                        showCongratulations();
                    }
                } else {
                    $("#error-message").text("Не вірна цифра");
                    currentIndex = 0;
                    resetGrid();
                    startTimer(); 
                }
            });
        }
    }
    
    function applyRandomColor(cell) {
       
        var colors = ["red", "blue", "green","yellow","orange","purple","pink","brown","grey","lime"];
        var randomColor = colors[Math.floor(Math.random() * colors.length)];
        cell.addClass(randomColor);
    }

    

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    
function showCongratulations() {
    $("#error-message").text("");
    $("#screen2").hide();
    $("#screen3").show();
    stopTimer();

    var playerName = "Гравець"; 
    var currentTime = $("#timer").text(); 

  
    addGameResult(playerName, currentTime);

    
    updateResultsTable();

        
    }
    
    
    
    function updateResultsTable() {
        var table = $("#resultsTable");
        table.find("tr:gt(0)").remove(); 
    
        gameResults.forEach(function (result) {
            var row = $("<tr>");
            row.append($("<td>").text(result.player));
            row.append($("<td>").text(result.time));
            table.append(row);
        });

    }
    function addGameResult(player, time) {
        gameResults.push({ player: player, time: time });
        localStorage.setItem("gameResults", JSON.stringify(gameResults));
    }
    
    

    function padZero(value) {
        return (value < 10) ? "0" + value : value;
    }
});










