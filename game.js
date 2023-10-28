let timerCount; 
let selectedNumList = [];
let secondsLeft = 60;
let gameList = []
let pickedNumbers = [];



const countdownDisplay = document.getElementById("countdownDisplay");
const tableGame = document.getElementById("tableGame")
const num_display = document.getElementById("num_display")
const tableStatus = document.getElementById("tableStatus")

$("#page2").hide();
$("#page3").hide();
class Match {
  constructor(name, time) {
    this.name = name;
    this.time = time;
    this.isWon = false;
  }
  setWonStatus(isWon) {
    this.isWon = isWon;
  }
}
$("#page2_with_page1").click(function () {
  $("#page1").hide();
  $("#page2").show();
});
$("#page3_with_page1").click(function () {
  $("#page1").hide();
  $("#page3").show();
  statusTableGenerator();
});
$("#page1_with_page2").click(function () {
  $("#page2").hide();
  $("#page1").show();
});
$("#page1_with_page3").click(function () {
  $("#page3").hide();
  $("#page1").show();
});
const mapGenerator = () => {
  secondsLeft = 60;
  selectedNumList = [];
  pickedNumbers = [];
  num_display.textContent = "";
  clearInterval(timerCount);
  while (tableGame.firstChild) {
    tableGame.removeChild(tableGame.firstChild);
  }
  gameStart();
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      const gridCell = document.createElement("div");
      gridCell.classList.add("gridCell");
      cellAddListener(gridCell);
      const variantRandom = Math.floor(Math.random() * 5) + 1;
      switch (variantRandom) {
        case 1:
          gridCell.classList.add('gridCell__variant-1')
          break;
        case 2:
          gridCell.classList.add('gridCell__variant-2')
          break;
        case 3:
          gridCell.classList.add('gridCell__variant-3')
          break;
        case 4:
          gridCell.classList.add('gridCell__variant-4')
          break;
        case 5:
          gridCell.classList.add('gridCell__variant-5')
          break;
      }
      while (true) {
        const randomNum = Math.floor(Math.random() * 25) + 1;
        if (!selectedNumList.includes(randomNum)) {
          gridCell.textContent = randomNum.toString();
          selectedNumList.push(randomNum);
          break;
        }
      }
      tableGame.appendChild(gridCell);
    }
  }
}
const gameStart = () => {
  countdownDisplay.textContent = secondsLeft.toString();
  timerCount = setInterval(function () {
    secondsLeft--;
    countdownDisplay.textContent = secondsLeft.toString();
    if (secondsLeft <= 0) {
      clearInterval(timerCount);
      countdownDisplay.textContent = "Час вийшов";
    }
  }, 1000);
}
const checkNums = () => {
  for (let i = 0; i < pickedNumbers.length; i++){
    if (pickedNumbers[0] === 25) {
      if (i !== pickedNumbers.length-1 && (pickedNumbers[i] - pickedNumbers[i+1] !== 1)){
        return false;
      }
    }else {
      if (i !== pickedNumbers.length-1 && (pickedNumbers[i] - pickedNumbers[i+1] !== -1)){
        return false;
      }
    }
  }
  return true;
}
const cellAddListener = (gridCell) => {
  gridCell.addEventListener('click', function() {
    let pickedNum = parseInt(gridCell.textContent);
    pickedNumbers.push(pickedNum);
    num_display.textContent = pickedNumbers.join(', ')
  
    if (pickedNumbers.length > 1) {
      if (!checkNums()) {
        clearInterval(timerCount);
        const match = new Match(`Матч ${gameList.length+1}`, secondsLeft);
        gameList.push(match)
        alert('Невірна цифра!');
        while (tableGame.firstChild) {
          tableGame.removeChild(tableGame.firstChild);
        }
      }
      if (pickedNumbers.length === 10) {
        clearInterval(timerCount);
        const match = new Match(`Матч ${gameList.length+1}`, secondsLeft);
        match.setWonStatus(true);
        gameList.push(match)
        alert('Ви виграли! Правильна послідовність чисел: ' + pickedNumbers.join(', '));
        while (tableGame.firstChild) {
          tableGame.removeChild(tableGame.firstChild);
        }
      }
    }
  });
}
const statusTableGenerator = () => {
  while (tableStatus.firstChild) {
    tableStatus.removeChild(tableStatus.firstChild);
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
  tableStatus.appendChild(tr);
  for (let i = 0; i < gameList.length; i++) {
    tr = document.createElement("tr");
    th1 = document.createElement("th");
    th1.textContent = gameList[i].name;
    tr.appendChild(th1);
    th2 = document.createElement("th");
    th2.textContent = gameList[i].time;
    tr.appendChild(th2);
    th3 = document.createElement("th");
    th3.textContent = gameList[i].isWon;
    tr.appendChild(th3);
    tableStatus.appendChild(tr);
  }
}
