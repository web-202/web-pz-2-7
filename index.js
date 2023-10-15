$(document).ready(function () {
    $("#start-button").on("click", function () {
        window.location.href = "./index2.html";
    });
  });

  var seconds = 60;

  // Отримуємо елемент, де відображатиметься таймер
  var timerElement = document.getElementById('timer');

  // Функція, що оновлює таймер
  function updateTimer() {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;

    // Форматуємо час у формат "хвилини:секунди" з двома цифрами
    var formattedTime = (minutes < 10 ? "0" : "") + minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;

    // Відображаємо відформатований час
    timerElement.innerHTML = formattedTime;

    // Зменшуємо лічильник секунд
    seconds--;

    // Якщо час закінчився, зупиняємо таймер
    if (seconds < 0) {
      clearInterval(timerInterval);
      timerElement.innerHTML = "Час вийшов!";
    }
  }

  // Викликаємо функцію оновлення таймера кожну секунду
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

  // Перемішуємо масив чисел
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
    selectedNumbers = [];
    var numberElements = document.querySelectorAll('.number');
    numberElements.forEach(function (element) {
      element.classList.remove('selected');
      element.style.filter = 'brightness(100%)'; // Повернення яскравості до початкового стану
    });

    clearInterval(timerInterval); // Зупинити таймер
    startTimer(); // Почати таймер
  }

  function toggleNumber(event) {
    var number = parseInt(event.target.textContent);
    var index = selectedNumbers.indexOf(number);
    if (index === -1) {
      if (selectedNumbers.length < 10) {
        selectedNumbers.push(number);
        event.target.classList.add('selected');
        event.target.style.filter = 'brightness(120%)'; // Збільшення яскравості на 120%
      }
    } else {
      selectedNumbers.splice(index, 1);
      event.target.classList.remove('selected');
      event.target.style.filter = 'brightness(100%)'; // Повернення яскравості до початкового стану
    }

    // Перевірка, чи користувач вибрав правильну послідовність
    if (selectedNumbers.length === 10) {
      var isCorrectSequence = true;
      for (var i = 0; i < selectedNumbers.length - 1; i++) {
        if (selectedNumbers[i] >= selectedNumbers[i + 1]) {
          isCorrectSequence = false;
          break;
        }
      }
      if (isCorrectSequence) {
        clearInterval(timerInterval); // Зупинити таймер
        alert("Вітаю, ти переміг!");
      } else {
        clearInterval(timerInterval); // Зупинити таймер
        alert("На жаль, ти натискав на не послідовні значення");
      }
    }
  }

  // Функція перемішування масиву
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  // Функція старту таймера
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
