$(document).ready(function () {
  $("#start-button").click(function () {
    $("#app-container").hide();
  });
});

$(document).ready(function () {
  const gridSize = 5;
  const maxNumber = 25;
  const sequence = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let currentNumberIndex = 0;
  let timer;

  var startButton = $('#start-button');


  for (let i = 1; i <= gridSize; i++) {
    let row = $('<tr></tr>');
    for (let j = 1; j <= gridSize; j++) {
      let cell = $('<td></td>');
      cell.addClass('number-style-' + (i * j % 5 + 1));
      row.append(cell);
    }
    $('#grid').append(row);
  }

  const shuffledNumbers = shuffleArray([...Array(maxNumber).keys()]).map((n) => n + 1);

  $('#grid td').each(function () {
    if (shuffledNumbers.length > 0) {
      const number = shuffledNumbers.pop();
      $(this).text(number);
      $(this).click(function () {
        if (number === sequence[currentNumberIndex]) {
          $(this).addClass('selected');
          currentNumberIndex++;
          if (currentNumberIndex === sequence.length) {
            clearInterval(timer);
            resetGame();
          }
        }
      });
    }
  });

  $('#reset-button').click(function () {
    clearInterval(timer);
    startTime = 0;
    currentNumberIndex = 0;
    $('#timer').text('00:00');
    createAndDisplayGrid();
    clearResult();
  });

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function createAndDisplayGrid() {
    currentNumberIndex = 0;
    const shuffledNumbers = shuffleArray([...Array(maxNumber).keys()]).map((n) => n + 1);

    $('#grid td').each(function () {
      if (shuffledNumbers.length > 0) {
        const number = shuffledNumbers.pop();
        $(this).text(number);
        $(this).removeClass('selected');
        $(this).off('click');
        $(this).click(function () {
          if (number === sequence[currentNumberIndex]) {
            $(this).addClass('selected');
            currentNumberIndex++;
            if (currentNumberIndex === sequence.length) {
              let game = localStorage.getItem("game") ? parseInt(localStorage.getItem("game")): 1

              let winders = [{
                seconds: $("#timer").text(),
                game
              }]


              clearInterval(timer);
              if (localStorage.getItem("winers")) {
                winders = [...JSON.parse(localStorage.getItem("winers")), winders[0]]
              }
              localStorage.setItem("game", game + 1)
              localStorage.setItem("winers", JSON.stringify(winders))

              displayResult('Вітаю! Ви виграли!');
            }
          } else {
            clearInterval(timer);
            displayResult('Нажаль, ви програли:(');
          }
        });
      }
    });
    startTime = new Date().getTime();
    startTimer();
  }

  function displayResult(message) {
    $('#result-message').text(message);
  }

  function clearResult() {
    $('#result-message').text('');
  }

  function startTimer() {
    timer = setInterval(function () {
      let now = new Date().getTime();
      let elapsedTime = new Date(now - startTime);
      $('#timer').text(
        (elapsedTime.getMinutes() < 10 ? '0' : '') + elapsedTime.getMinutes() + ':' +
        (elapsedTime.getSeconds() < 10 ? '0' : '') + elapsedTime.getSeconds()
      );
    }, 1000);
  }

  startButton.click(function () {
    window.location.href = "main.html";
  });


});





























