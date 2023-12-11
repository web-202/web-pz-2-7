let timer = 60
let count = 1
let countTry = 3
let isWin = false
let isLose = false
let intervalTimer
let countGame = 1

let warning
let warningTry
const winList = document.querySelector('.wins')



let isRevers = false



document.getElementById('start-game').addEventListener('click', () => {
    document.querySelector('.main__title').remove()
    document.getElementById('start-game').remove()

    const warningDiv = document.createElement('div');
    warningDiv.className = 'warning';
    warningDiv.textContent = 'Залишилось ';

    const spanElement = document.createElement('span');
    spanElement.textContent = '3 спроби';

    warningDiv.appendChild(spanElement);

    document.body.appendChild(warningDiv);

    warning = document.querySelector('.warning')
    warningTry = document.querySelector('.warning > span')

    restartGame()
})
const newGame = () => {
    document.getElementById('start-game-again').addEventListener('click', () => {
        document.querySelector('.timer').remove()
        document.querySelector('.game__block').remove()
        document.getElementById('start-game-again').remove()
        document.querySelector('.warning').remove()
        clearInterval(intervalTimer)
        timer = 60
        countTry = 3
        count = 1
        const warningDiv = document.createElement('div');
        warningDiv.className = 'warning';
        warningDiv.textContent = 'Залишилось ';

        const spanElement = document.createElement('span');
        spanElement.textContent = '3 спроби';

        warningDiv.appendChild(spanElement);

        document.body.appendChild(warningDiv);

        warning = document.querySelector('.warning')
        warningTry = document.querySelector('.warning > span')
        countGame++


        isWin = false
        isLose = false
        restartGame()

    })
}
const timerCounter = () => {
    document.querySelector('.timer__score').textContent = timer
    if (timer == 0) {
        loseHandler()
        return
    }
    timer--
}
const restartGame = () => {

    const startGameAgain = document.createElement('div');
    startGameAgain.className = 'btn__start';
    startGameAgain.id = 'start-game-again'
    startGameAgain.innerHTML = 'Почати гру знову';

    const timerDiv = document.createElement('div');
    timerDiv.className = 'timer';
    timerDiv.innerHTML = 'Залишилось: <span class="timer__score">60</span>';

    const reverse = document.createElement('div');
    reverse.className = 'reverse';
    if(isRevers){
        reverse.innerHTML = 'З 10 до 1';
    }
    else{
        reverse.innerHTML = 'З 1 до 10';
    }
    
    const gameBlockDiv = document.createElement('div');
    gameBlockDiv.className = 'game__block';
    if(isRevers){
        count = 10
    }
    const numbers = Array.from({ length: 10 }, (_, index) => index + 1);
    numbers.sort(() => Math.random() - 0.5);

    for (let index = 0; index < 10; index++) {
        let gameElementDiv = document.createElement('div');
        gameElementDiv.className = 'game__element';
        var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        gameElementDiv.style.color = randomColor;
        var randomSize = Math.floor(Math.random() * (60 - 15 + 1)) + 15;
        gameElementDiv.style.fontSize = randomSize + 'px';
        gameElementDiv.innerHTML = `${numbers[index]}`;
        gameBlockDiv.appendChild(gameElementDiv);
    }

    var gameContentDiv = document.querySelector('.game__content');

    gameContentDiv.appendChild(timerDiv);
    gameContentDiv.appendChild(gameBlockDiv);
    gameContentDiv.appendChild(startGameAgain);
    gameContentDiv.appendChild(reverse);

    intervalTimer = setInterval(timerCounter, 1000);

    addEventForItem()
    newGame()
}
const addEventForItem = () => {
    document.querySelectorAll('.game__element').forEach(item => {


        item.addEventListener('click', () => {
            if (isLose || isWin) return

            if (parseInt(item.textContent) == count) {
                item.style.color = '#49ca54';
                item.style.backgroundColor = '#49ca54';
                if(isRevers){
                    count--
                }
                else{
                    count++
                }
                

                if (count == 11 || count == 0) {
                    isWin = true
                    clearInterval(intervalTimer)
                    warning.textContent = 'Ти преміг'
                    warning.style.backgroundColor = '#49ca54';
                    warning.style.color = '#fffff';

                    const newLi = document.createElement('li');

                    newLi.textContent = `Гра №${countGame}  Результат: ${60 - timer}cек`;

                    winList.appendChild(newLi);


                }
            }
            else {
                countTry--
                if (countTry <= 0) {
                    loseHandler()
                    return
                }
                warningTry.textContent = countTry + ' спроби'

            }
        })
    }
    )
}
const loseHandler = () => {
    isLose = true
    clearInterval(intervalTimer)
    warning.textContent = 'Ти програв'
    warning.style.backgroundColor = '#d13838';
    warning.style.color = '#fffff';
}
document.getElementById('reverse').addEventListener('click',()=>{
    isRevers = !isRevers
    document.querySelector('.timer').remove()
    document.querySelector('.reverse').remove()
        document.querySelector('.game__block').remove()
        document.getElementById('start-game-again').remove()
        document.querySelector('.warning').remove()
        clearInterval(intervalTimer)
        timer = 60
        countTry = 3
        count = 1
        const warningDiv = document.createElement('div');
        warningDiv.className = 'warning';
        warningDiv.textContent = 'Залишилось ';

        const spanElement = document.createElement('span');
        spanElement.textContent = '3 спроби';

        warningDiv.appendChild(spanElement);

        document.body.appendChild(warningDiv);

        warning = document.querySelector('.warning')
        warningTry = document.querySelector('.warning > span')
        countGame++


        isWin = false
        isLose = false
        restartGame()
})