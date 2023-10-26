let gameResults = [];

$(document).ready(function () {

    $("#thoScene, #treScene").hide();


    $("#start-button").on("click", function () {
        $("#oneScene").hide();
        $("#thoScene").show();
    });


    $("#show-results").on("click", function () {
        $("#oneScene").hide();
        $("#thoScene").hide();
        $("#treScene").show();
        displayResults();   
    });


    $("#return-to-game").on("click", function () {
        $("#treScene").hide();
        $("#thoScene").show(); 
    });


    $("#start-game").on("click", function () {
        startGame();
        generateNewNumbers();
    });

});

function displayResults() {

    const resultsTable = $("#results");
    resultsTable.empty();


    for (let i = 0; i < gameResults.length; i++) {
        resultsTable.append(`<tr><td>Гра ${gameResults[i].gameNumber}</td><td>${gameResults[i].time} с</td></tr>`);
    }
}

  var seconds = 60;
  var timerElement = document.getElementById('timer');
  var timerInterval; 

  var gameNumber = 1;
  var startTime; 

  function updateTimer() {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;

    var formattedTime = (minutes < 10 ? "0" : "") + minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;

    timerElement.innerHTML = formattedTime;

    seconds--;

    if (seconds < 0) {
      clearInterval(timerInterval);
      timerElement.innerHTML = "Час вийшов!";
    }
  }

  var timerInterval = setInterval(updateTimer, 1000);


  var numbersArray = [];
  var selectedNumbers = [];
  var timerInterval;

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  for (var i = 1; i <= 25; i++) {
    numbersArray.push(i);
  }

  shuffleArray(numbersArray);

  var numbersContainer = document.getElementById('numbers');

  for (var i = 0; i < 25; i++) {
    var numberElement = document.createElement('div');
    numberElement.className = 'number';
    numberElement.textContent = numbersArray[i];
    numberElement.style.backgroundColor = getRandomColor();
    numberElement.addEventListener('click', toggleNumber);
    numbersContainer.appendChild(numberElement);

    if ((i + 1) % 5 === 0) {
      var lineBreak = document.createElement('br');
      numbersContainer.appendChild(lineBreak);
    }
  }

  var startButton = document.getElementById('start-button');
  startButton.addEventListener('click', startGame);

  function startGame() {
    startTime = new Date();

    selectedNumbers = [];
    var numberElements = document.querySelectorAll('.number');
    numberElements.forEach(function (element) {
      element.classList.remove('selected');
      element.style.filter = 'brightness(100%)';
    });

    clearInterval(timerInterval);
    startTimer();
  }

  function toggleNumber(event) {
    var number = parseInt(event.target.textContent);
    var index = selectedNumbers.indexOf(number);
    if (index === -1) {
      if (selectedNumbers.length < 10) {
        selectedNumbers.push(number);
        event.target.classList.add('selected');
        event.target.style.filter = 'brightness(120%)';
      }
    } else {
      selectedNumbers.splice(index, 1);
      event.target.classList.remove('selected');
      event.target.style.filter = 'brightness(100%)'; 
    }


    if (selectedNumbers.length === 10) {
      var isCorrectSequence = true;
      for (var i = 0; i < selectedNumbers.length - 1; i++) {
        if (selectedNumbers[i] >= selectedNumbers[i + 1]) {
          isCorrectSequence = false;
          break;
        }
      }

    if (isCorrectSequence) {
        const endTime = new Date();
        const elapsedTime = (endTime - startTime) / 1000;

        gameResults.push({ gameNumber, time: elapsedTime });
        gameNumber++;

        clearInterval(timerInterval); 
        alert("Вітаю, ти переміг!");
        } else {
        clearInterval(timerInterval); 
        alert("На жаль, ти натискав на не послідовні значення");
      }
    }
  }


  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }


  function startTimer() {
    var seconds = 60;
    var timerElement = document.getElementById('timer');
     timerInterval = setInterval(function () {
      var minutes = Math.floor(seconds / 60);
      var remainingSeconds = seconds % 60;
      var formattedTime = (minutes < 10 ? "0" : "") + minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
      timerElement.innerHTML = formattedTime;
      seconds--;
      if (seconds < 0) {
        clearInterval(timerInterval);
        timerElement.innerHTML = "Час вийшов!";
      }
    }, 1000);
  }

  function createUniqueRandomNumbers(min, max) {
    let uniqueNumbers = [];
    let totalNumbers = max - min + 1;

    for (let i = 0; i < totalNumbers; i++) {
        let randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * totalNumbers) + min;
        } while (uniqueNumbers.includes(randomNumber));

        uniqueNumbers.push(randomNumber);
    }

    return uniqueNumbers;
    }


  function generateNewNumbers() {
    let numberElements = document.querySelectorAll('.number');
    let uniqueNumbers = createUniqueRandomNumbers(1, 25);

    numberElements.forEach(function (element, index) {
        let newNumber = uniqueNumbers[index];
        let newColor = getRandomColor();
        element.textContent = newNumber;
        element.style.backgroundColor = newColor;
        element.classList.remove('selected');
        element.style.filter = 'brightness(100%)';
    });
    }    