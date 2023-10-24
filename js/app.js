$(document).ready(function () {
  $("#startButton").click(function () {
    $("#screen1").hide();
    $("#screen2").show();
  });

  let timer;
  let timeLeft = 60;
  let sequence = generateRandomSequence();
  let selectedNumbers = [];

  function startTimer() {
    timer = setInterval(function () {
      timeLeft--;
      $("#time").text(timeLeft);
      if (timeLeft === 0) {
        endGame("Час вийшов. Гра закінчена.");
      }
    }, 1000);
  }

  function generateRandomSequence() {
    let sequence = [];
    for (let i = 1; i <= 25; i++) {
      sequence.push(i);
    }
    return shuffleArray(sequence);
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function displayBoard() {
    let $gameBoard = $("#gameBoard");
    $gameBoard.empty();

    const commonColor = "white";
    const borderColor = "#bd3624";

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        const number = sequence[i * 5 + j];
        const $cell = $("<div>")
          .addClass("cell")
          .attr("data-number", number)
          .css({
            backgroundColor: commonColor,
            color: getRandomColor(),
            border: `3px solid ${borderColor}`,
          })
          .append(
            $("<span>")
              .css({
                fontWeight: "bold",
                fontSize: getRandomSize(),
                display: "inline-block",
              })
              .text(number)
          )
          .click(handleCellClick);

        $gameBoard.append($cell);
      }
    }
  }

  function getRandomColor() {
    const colors = [
      "red",
      "blue",
      "green",
      "yellow",
      "purple",
      "orange",
      "brown",
      "cyan",
      "magenta",
      "darkred",
      "darkblue",
      "darkgreen",
      "darkyellow",
      "darkpurple",
      "darkorange",
      "darkpink",
      "darkbrown",
      "darkcyan",
      "darkmagenta",
    ];

    const randomIndex = Math.floor(Math.random() * colors.length);

    return colors[randomIndex];
  }

  function getRandomSize() {
    return Math.floor(Math.random() * (24 - 14 + 1) + 17) + "px";
  }

  function handleCellClick() {
    const selectedNumber = parseInt($(this).attr("data-number"));
    if (selectedNumber === selectedNumbers.length + 1) {
      selectedNumbers.push(selectedNumber);
      if (selectedNumbers.length === 10) {
        endGame("Ви виграли!");
        addResulttToLocalStorage();
      }
    } else {
      $("#dialog").dialog("open");
      restartGame();
    }
  }

  function endGame(message) {
    clearInterval(timer);
    alert(message);
  }

  function restartGame() {
    clearInterval(timer);
    timeLeft = 60;
    selectedNumbers = [];
    sequence = generateRandomSequence();
    displayBoard();
    $("#time").text(timeLeft);
    startTimer();
  }

  displayBoard();

  $("#dialog").dialog({
    autoOpen: false,
    modal: true,
    buttons: {
      OK: function () {
        $(this).dialog("close");
      },
    },
  });

  $("#congrats-dialog").dialog({
    autoOpen: false,
    modal: true,
    buttons: {
      OK: function () {
        $(this).dialog("close");
        restartGame();
      },
    },
  });

  $("#restartButton").click(function () {
    restartGame();
  });

  $(document).ready(function () {
    $("#resultButton").click(function () {
      window.location.href = "../html/time.html";
    });
  });

  function addResulttToLocalStorage() {
    const timeLeft = 60 - parseInt($("#time").text());
    const gameNumber = getNexttGameNumber();

    const results = getLocaalStorageResults1();
    results.push({
      id: `Гра ${gameNumber}`,
      time: `${timeLeft} с.`,
    });

    localStorage.setItem("results", JSON.stringify(results));
  }

  function getLocaalStorageResults1() {
    const storedResults = localStorage.getItem("results");
    return storedResults ? JSON.parse(storedResults) : [];
  }
  function getNexttGameNumber() {
    const results = getLocaalStorageResults1();
    const lastResult = results[results.length - 1];
    return lastResult ? parseInt(lastResult.id.split(" ")[1]) + 1 : 1;
  }

});
