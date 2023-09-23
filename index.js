const timerElement = document.getElementById("timerElement");
const gameTable = document.getElementById('gameTable')
const currentNumbers = document.getElementById('currentNumbers')
const statusTable = document.getElementById('statusTable')


let countdown; // Змінна для ідентифікації таймера
let listOfSelectNumbers = [];
let timeLeft = 60;
let listOfGame = []

let selectedNumbers = [];

$("#screen2").hide();
$("#screen3").hide();

class Game {
  constructor(name, time) {
    this.name = name;
    this.time = time;
    this.isWon = false;
  }

  setWonStatus(isWon) {
    this.isWon = isWon;
  }
}

$("#goToScreen2withScreen1").click(function () {
  $("#screen1").hide();
  $("#screen2").show();
});

$("#goToScreen3withScreen1").click(function () {
  $("#screen1").hide();
  $("#screen3").show();
  generateStatusTable();
});

$("#goToScreen1withScreen2").click(function () {
  $("#screen2").hide();
  $("#screen1").show();
});

$("#goToScreen1withScreen3").click(function () {
  $("#screen3").hide();
  $("#screen1").show();
});


const generateMap = () => {
  timeLeft = 60;
  listOfSelectNumbers = [];
  selectedNumbers = [];
  currentNumbers.textContent = "";
  clearInterval(countdown);

  while (gameTable.firstChild) {
    gameTable.removeChild(gameTable.firstChild);
  }

  startGame();

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      addListener(cell);
      const randomVariant = Math.floor(Math.random() * 5) + 1;
      switch (randomVariant) {
        case 1:
          cell.classList.add('cell__variant-1')
          break;
        case 2:
          cell.classList.add('cell__variant-2')
          break;
        case 3:
          cell.classList.add('cell__variant-3')
          break;
        case 4:
          cell.classList.add('cell__variant-4')
          break;
        case 5:
          cell.classList.add('cell__variant-5')
          break;
      }
      while (true) {
        const randomNumber = Math.floor(Math.random() * 25) + 1;
        if (!listOfSelectNumbers.includes(randomNumber)) {
          cell.textContent = randomNumber.toString();
          listOfSelectNumbers.push(randomNumber);
          break;
        }
      }
      gameTable.appendChild(cell);
    }
  }
}

const startGame = () => {
  timerElement.textContent = timeLeft.toString();

  countdown = setInterval(function () {
    timeLeft--;
    timerElement.textContent = timeLeft.toString();

    if (timeLeft <= 0) {
      clearInterval(countdown);
      timerElement.textContent = "Час вийшов";
    }
  }, 1000);
}

const checkNumbers = () => {
  for (let i = 0; i < selectedNumbers.length; i++){
    if (selectedNumbers[0] === 25) {
      if (i !== selectedNumbers.length-1 && (selectedNumbers[i] - selectedNumbers[i+1] !== 1)){
        return false;
      }
    }else {
      if (i !== selectedNumbers.length-1 && (selectedNumbers[i] - selectedNumbers[i+1] !== -1)){
        return false;
      }
    }
  }
  return true;
}

const addListener = (cell) => {
  cell.addEventListener('click', function() {
    let selectedNumber = parseInt(cell.textContent);

    selectedNumbers.push(selectedNumber);
    currentNumbers.textContent = selectedNumbers.join(', ')
    if (selectedNumbers.length > 1) {
      if (!checkNumbers()) {
        clearInterval(countdown);
        const game = new Game(`Гра ${listOfGame.length+1}`, timeLeft);
        listOfGame.push(game)
        alert('Невірна цифра!');
        while (gameTable.firstChild) {
          gameTable.removeChild(gameTable.firstChild);
        }
      }
      if (selectedNumbers.length === 10) {
        clearInterval(countdown);
        const game = new Game(`Гра ${listOfGame.length+1}`, timeLeft);
        game.setWonStatus(true);
        listOfGame.push(game)
        alert('Ви виграли! Правильна послідовність чисел: ' + selectedNumbers.join(', '));
        while (gameTable.firstChild) {
          gameTable.removeChild(gameTable.firstChild);
        }
      }
    }
  });
}

const generateStatusTable = () => {
  while (statusTable.firstChild) {
    statusTable.removeChild(statusTable.firstChild);
  }

  let tr = document.createElement("tr");
  let th1 = document.createElement("th");
  th1.textContent = 'Назва гри';
  tr.appendChild(th1);
  let th2 = document.createElement("th");
  th2.textContent = 'Час';
  tr.appendChild(th2);
  let th3 = document.createElement("th");
  th3.textContent = 'Статус перемоги';
  tr.appendChild(th3);
  statusTable.appendChild(tr);

  for (let i = 0; i < listOfGame.length; i++) {
    tr = document.createElement("tr");
    th1 = document.createElement("th");
    th1.textContent = listOfGame[i].name;
    tr.appendChild(th1);
    th2 = document.createElement("th");
    th2.textContent = listOfGame[i].time;
    tr.appendChild(th2);
    th3 = document.createElement("th");
    th3.textContent = listOfGame[i].isWon;
    tr.appendChild(th3);
    statusTable.appendChild(tr);
  }
}
