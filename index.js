const table = document.getElementById('table')
const timerElement = document.getElementById("time-remainder");
const table_game = document.createElement('div')
const result = document.getElementById('result-table')

let results = []
let numbers = []
let clearTime = 60
let timeInterval

const startInterval = () => {
    timeInterval = setInterval(() => {
        timerElement.textContent = clearTime
        clearTime--
        if(clearTime < 0){
            clearInterval(timeInterval)
            alert('Час вичерпано!')
            $('.game').hide()
            $('.start-game').show()
        }
    }, 1000)
}


const start = () => {
    table_game.innerHTML = ''
    clearTime = 60
    numbers = []
    initBlocks()
    clearInterval(timeInterval)
    startInterval()
}


const initBlocks = () => {
    table_game.className = 'table-game'
    table_game.id = 'table-game-id'
    table.appendChild(table_game)
    
    const randomNumbers = generateRandomNumbers()
    
    for (let i = 0; i < 5; i++) {
        const row = document.createElement('div')
        row.className = 'row-table'
        table_game.appendChild(row)
        for (let j = 0; j < 5; j++) {
            const block = document.createElement('div')
            block.className = 'block-table'
            block.textContent = randomNumbers[i*5 + j]
            eventListenerBlock(block)
            getRandomStyleNumbers(block)
            row.appendChild(block)
        } 
    }
}


const getRandomStyleNumbers = (block) => {
    const randomIndex = Math.floor(Math.random() * 5);

    switch(randomIndex){
        case 0:   
                block.classList.add('block-table-style-0')
            break;
        case 1:
                block.classList.add('block-table-style-1')
            break;
        case 2:
                block.classList.add('block-table-style-2')
            break;
        case 3:
                block.classList.add('block-table-style-3')
            break;
        case 4:
                block.classList.add('block-table-style-4')
            break;   
    }
}

const eventListenerBlock = (block) => {
    block.addEventListener('click', ()=> {
        const number = Number(block.textContent)
        console.log(number)
        console.log(numbers)
        console.log(results)
        if(numbers.length == 0 && number != 1){
            looseGame()
        }

        if(numbers.length == 9 && number == 10){
            clearInterval(timeInterval)
            winGame(clearTime)
        }

        if(numbers[numbers.length - 1] + 1 != number && numbers.length != 0){
            looseGame()
        }

        numbers.push(number)
    })
}

const generateRandomNumbers = () => {  
    const numbers = [];
    for (let i = 1; i <= 25; i++) {
      numbers.push(i);
    }
  
    const randomNumbers = [];
    for (let i = 0; i < 25; i++) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      const randomNumber = numbers.splice(randomIndex, 1)[0];
      randomNumbers.push(randomNumber);
    }
  
    return randomNumbers;
}


const winGame = (time) => {
    let result = {
        game_name: `Гра №${results.length + 1}`,
        time_finish: `${60-time}с`
    }
    results.push(result)

    loadDashBoardResults()
}

const looseGame = () => {
    alert('Ви програли!')
    clearInterval(timeInterval)
    $('.game').hide()
    $('.start-game').show()
}

  
const loadDashBoardResults = () => {
    $('.game').hide()
    $('.result-block').show()
    result.innerHTML = ''

    for (let i = 0; i < results.length; i++) {
        const rowResult = document.createElement('div')
        rowResult.classList.add('row-result')

        const resultName = document.createElement('div')
        resultName.classList.add('result')
        resultName.textContent = results[i].game_name

        const resultTime = document.createElement('div')
        resultTime.classList.add('result')
        resultTime.textContent = results[i].time_finish

        rowResult.appendChild(resultName)
        rowResult.appendChild(resultTime)
    
        result.appendChild(rowResult)
    }
}


$('.game').hide()
$('.result-block').hide()

$('#restart-btn').click(() => {
    start()
})

$('#start-game').click(() => {
    $('.start-game').hide()
    start()
    $('.game').show()
})

$('#restart-btn-result').click(() => {
    $('.result-block').hide()
    start()
    $('.game').show()
})

