const table = document.getElementById('table');
const timer = document.getElementById("timer");
const start = document.getElementById('start')
let listOfNumbers = [];
let listOfSelectedNumbers = [];
let countdown;
let timeLeft = 60;


$("#game").hide();

$("#UrlGame").click(function () {
    $("#menu").hide();
    $("#game").show();
});
$("#UrlMenu").click(function () {
    $("#game").hide();
    $("#menu").show();
});




const logic = () => {
    for (let i = 0; i < listOfSelectedNumbers.length; i++) {
        if ((listOfSelectedNumbers[i] - listOfSelectedNumbers[i + 1] !== -1) && i !== listOfSelectedNumbers.length - 1) {
            return true
        }
    }
    return false;
}

let array = [];
let countOfGame = 1;

const tableScore = document.getElementById('table-score');

const pushData = () => {

    array.forEach((value, index) => {
        if (array.length-1 === index){
            let tr = document.createElement('tr');
            let td = document.createElement('td');
            td.textContent = value.game;
            tr.appendChild(td)
            td = document.createElement('td');
            td.textContent = value.time;
            tr.appendChild(td)
            tableScore.appendChild(tr)
        }
    })
}

const startTimer = () => {
    timer.textContent = timeLeft.toString();

    countdown = setInterval(function () {
        timeLeft--;
        timer.textContent = timeLeft.toString();

        if (timeLeft <= 0) {
            clearInterval(countdown);
            timer.textContent = "Time left!";
        }
    }, 1000);
}

const createTable = () => {
    console.log(array)
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    listOfNumbers = []
    listOfSelectedNumbers = []
    timeLeft = 60;
    clearInterval(countdown);
    startTimer()


    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            while (true) {
                const randomNumber = Math.floor(Math.random() * 25) + 1;
                if (!listOfNumbers.includes(randomNumber)) {
                    cell.textContent = randomNumber.toString();
                    listOfNumbers.push(randomNumber);
                    break;
                }
            }

            const randomVariant = Math.floor(Math.random() * 6) + 1;
            if (randomVariant === 1){
                cell.style.color = 'red';
                cell.style.fontSize = "10px"
            }else if (randomVariant === 2){
                cell.style.color = 'purple';
                cell.style.fontSize = "13px"
            }else if (randomVariant === 3){
                cell.style.color = 'blue';
                cell.style.fontSize = "15px"
            }else if (randomVariant === 4){
                cell.style.color = 'yellow';
                cell.style.fontSize = "17px"
            }else if (randomVariant === 5){
                cell.style.color = 'green';
                cell.style.fontSize = "19px"
            }else if (randomVariant === 6){
                cell.style.color = 'orange';
                cell.style.fontSize = "22px"
            }

            cell.style.fontWeight = "bold"

            cell.addEventListener('click', () => {
                let selectedNumber = parseInt(cell.textContent);

                listOfSelectedNumbers.push(selectedNumber)
                console.log(listOfSelectedNumbers)

                cell.classList.add('selected')

                if (listOfSelectedNumbers.length > 9) {
                    alert('Congratulation, you win')
                    countOfGame++;
                    array.push({
                        game: `Game-${countOfGame}`,
                        time: timeLeft
                    })
                    pushData()
                    createTable();
                }
                if (listOfSelectedNumbers.length > 1 && logic()) {
                    alert('Incorrect number');
                    createTable();
                }

            })

            table.appendChild(cell);

        }
    }
}

start.addEventListener("click", createTable)