const timer_element = document.getElementById("timer_element");
const game_table = document.getElementById('game_table')
const current_numbers = document.getElementById('current_numbers')
const status_table = document.getElementById('status_table')


let countdown;
let listOfSelectNumbers = [];
let timeLeft = 60;
let listOfGame = []

let selected_numbers = [];

$("#page_2").hide();
$("#page_3").hide();

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

$("#goToPage_2withPage_1").click(function () {
  $("#page_1").hide();
  $("#page_2").show();
});

$("#goToPage_3withPage_1").click(function () {
  $("#page_1").hide();
  $("#page_3").show();
  generateStatusTable();
});

$("#goToPage_1withPage_2").click(function () {
  $("#page_2").hide();
  $("#page_1").show();
});

$("#goToPage_1withPage_3").click(function () {
  $("#page_3").hide();
  $("#page_1").show();
});


const map_generate = () => {
  timeLeft = 60;
  listOfSelectNumbers = [];
  selected_numbers = [];
  current_numbers.textContent = "";
  clearInterval(countdown);

  while (game_table.firstChild) {
    game_table.removeChild(game_table.firstChild);
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
          cell.classList.add('cell_variant_1')
          break;
        case 2:
          cell.classList.add('cell_variant_2')
          break;
        case 3:
          cell.classList.add('cell_variant_3')
          break;
        case 4:
          cell.classList.add('cell_variant_4')
          break;
        case 5:
          cell.classList.add('cell_variant_5')
          break;
        case 6:
          cell.classList.add('cell_variant_6')
          break;
        case 7:
          cell.classList.add('cell_variant_7')
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
      game_table.appendChild(cell);
    }
  }
}

const startGame = () => {
  timer_element.textContent = timeLeft.toString();

  countdown = setInterval(function () {
    timeLeft--;
    timer_element.textContent = timeLeft.toString();

    if (timeLeft <= 0) {
      clearInterval(countdown);
      timer_element.textContent = "The time is up!!!";
    }
  }, 1000);
}

const checkNumbers = () => {
  for (let i = 0; i < selected_numbers.length; i++){
    if (selected_numbers[0] === 25) {
      if (i !== selected_numbers.length-1 && (selected_numbers[i] - selected_numbers[i+1] !== 1)){
        return false;
      }
    }else {
      if (i !== selected_numbers.length-1 && (selected_numbers[i] - selected_numbers[i+1] !== -1)){
        return false;
      }
    }
  }
  return true;
}

const addListener = (cell) => {
  cell.addEventListener('click', function() {
    let selectedNumber = parseInt(cell.textContent);

    selected_numbers.push(selectedNumber);
    current_numbers.textContent = selected_numbers.join(', ')
    if (selected_numbers.length > 1) {
      if (!checkNumbers()) {
        clearInterval(countdown);
        const game = new Game(`Game ${listOfGame.length+1}`, timeLeft);
        listOfGame.push(game)
        alert('Incorrect number!!!');
        while (game_table.firstChild) {
          game_table.removeChild(game_table.firstChild);
        }
      }
      if (selected_numbers.length === 10) {
        clearInterval(countdown);
        const game = new Game(`Game ${listOfGame.length+1}`, timeLeft);
        game.setWonStatus(true);
        listOfGame.push(game)
        alert('You won! Correct sequence of numbers: ' + selected_numbers.join(', '));
        while (game_table.firstChild) {
          game_table.removeChild(game_table.firstChild);
        }
      }
    }
  });
}

const generateStatusTable = () => {
  while (status_table.firstChild) {
    status_table.removeChild(status_table.firstChild);
  }

  let tr = document.createElement("tr");
  let th1 = document.createElement("th");
  th1.textContent = 'The name of the game';
  tr.appendChild(th1);
  let th2 = document.createElement("th");
  th2.textContent = 'Time';
  tr.appendChild(th2);
  let th3 = document.createElement("th");
  th3.textContent = 'Victory status';
  tr.appendChild(th3);
  status_table.appendChild(tr);

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
    status_table.appendChild(tr);
  }
}