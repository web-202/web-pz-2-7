let gameValue = []
let timerInterval;
let timerRunning = false;
let seconds = 60;
let restartBtn = 0;

function updateTimer() {
    seconds--;
    const remainderSeconds = seconds % 60;
    const displayTime = `Залишилось: ${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.getElementById('timer').textContent = displayTime;
    if(seconds === 0){
        $('#btn_1, #btn_2, #btn_3, #btn_4, #btn_5, ' +
                '#btn_6, #btn_7, #btn_8, #btn_9, #btn_10,' +
                '#btn_11, #btn_12, #btn_13, #btn_14, #btn_15,' +
                '#btn_16, #btn_17, #btn_18, #btn_19, #btn_20,' +
                '#btn_21, #btn_22, #btn_23, #btn_24, #btn_25').addClass('button-disabled');
            alert('Час вийшов!');
            startStopTimer()
    }
  }
  function startStopTimer() {
    if (timerRunning) {
      clearInterval(timerInterval);
    } else {
      timerInterval = setInterval(updateTimer, 1000);
    }
    timerRunning = !timerRunning;
  }
function game(value) {
    gameValue.push(value)
    console.log(gameValue);
    console.log(gameValue[gameValue.length - 1]);
    console.log(gameValue[gameValue.length - 2] + 1);
    if (gameValue.length <= 10) {
        if (gameValue[gameValue.length - 1] === gameValue[gameValue.length - 2] + 1) {
            
            console.log("ok");
        } else if (gameValue[0] === 1 && gameValue.length === 1) {
            console.log("OKEY");
            startStopTimer()
        } else {
            $('#btn_1, #btn_2, #btn_3, #btn_4, #btn_5, ' +
                '#btn_6, #btn_7, #btn_8, #btn_9, #btn_10,' +
                '#btn_11, #btn_12, #btn_13, #btn_14, #btn_15,' +
                '#btn_16, #btn_17, #btn_18, #btn_19, #btn_20,' +
                '#btn_21, #btn_22, #btn_23, #btn_24, #btn_25').addClass('button-disabled');
            alert('Не вірна цифра!');
            startStopTimer()
        }

        

        if (gameValue[gameValue.length - 1] === 10 && gameValue.length === 10) {
            $('#btn_1, #btn_2, #btn_3, #btn_4, #btn_5, ' +
                '#btn_6, #btn_7, #btn_8, #btn_9, #btn_10,' +
                '#btn_11, #btn_12, #btn_13, #btn_14, #btn_15,' +
                '#btn_16, #btn_17, #btn_18, #btn_19, #btn_20,' +
                '#btn_21, #btn_22, #btn_23, #btn_24, #btn_25').addClass('button-disabled');
            
            alert('Вітаю, ви виграли!');
            restartBtn++;
            window.location.href = './result.html'

            let resultData = {
                name_game: `Гра ${restartBtn}`,
                time: `${seconds}`
            }

            localStorage.setItem('result', JSON.stringify(resultData))
            // !!!!!!!!!!!!!!!!!!!!
        }
    } else {
        $('#btn_1, #btn_2, #btn_3, #btn_4, #btn_5, ' +
            '#btn_6, #btn_7, #btn_8, #btn_9, #btn_10,' +
            '#btn_11, #btn_12, #btn_13, #btn_14, #btn_15,' +
            '#btn_16, #btn_17, #btn_18, #btn_19, #btn_20,' +
            '#btn_21, #btn_22, #btn_23, #btn_24, #btn_25').addClass('button-disabled');
        
    }
}

const containers = document.querySelectorAll('.container1');

// Змінюємо CSS для певних елементів
for(let i = 0; i < 25; i++){
    if(i % 5 === 0 || i === 0){
        containers[i].style.fontSize = '20px';
        containers[i].style.color = 'blue';
        containers[i].style.fontWeight = '100';
    }else if(i % 5 === 1){
        containers[i].style.fontSize = '45px';
        containers[i].style.color = 'red';
        containers[i].style.fontWeight = '500';
    }else if(i % 5 === 2){
        containers[i].style.fontSize = '25px';
        containers[i].style.color = 'orange';
        containers[i].style.fontWeight = '300';
    }else if(i % 5 === 3){
        containers[i].style.fontSize = '45px';
        containers[i].style.color = 'purple';
        containers[i].style.fontWeight = '200';
    }else if(i % 5 === 4){
        containers[i].style.fontSize = '15px';
        containers[i].style.color = 'green';
        containers[i].style.fontWeight = '600';
    }
    
}


function shuffleElements() {
    const container = document.querySelector('.grid-container'); // Отримуємо батьківський контейнер
    const children = Array.from(container.children); // Отримуємо всі дітей контейнера у формі масиву

    // Змішуємо елементи випадковим чином
    for (let i = children.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [children[i], children[j]] = [children[j], children[i]]; // Міняємо місцями два елементи
    }

    children.forEach((child, index) => {
        container.appendChild(child);
    });
}

shuffleElements()



  

$('#restart').click(function () {
    $('#btn_1, #btn_2, #btn_3, #btn_4, #btn_5, ' +
        '#btn_6, #btn_7, #btn_8, #btn_9, #btn_10,' +
        '#btn_11, #btn_12, #btn_13, #btn_14, #btn_15,' +
        '#btn_16, #btn_17, #btn_18, #btn_19, #btn_20,' +
        '#btn_21, #btn_22, #btn_23, #btn_24, #btn_25').removeClass('button-disabled');
    gameValue = [];
    seconds = 60;
    if(timerRunning === true){
        startStopTimer();
    }
})


$(document).ready(function () {
    $('#btn_1').click(function () {
        $('#btn_1').addClass('button-disabled')
    })

    $('#btn_2').click(function () {
        $('#btn_2').addClass('button-disabled')
    })

    $('#btn_3').click(function () {
        $('#btn_3').addClass('button-disabled')
    })

    $('#btn_4').click(function () {
        $('#btn_4').addClass('button-disabled')
    })

    $('#btn_5').click(function () {
        $('#btn_5').addClass('button-disabled')
    })

    $('#btn_6').click(function () {
        $('#btn_6').addClass('button-disabled')
    })

    $('#btn_7').click(function () {
        $('#btn_7').addClass('button-disabled')
    })

    $('#btn_8').click(function () {
        $('#btn_8').addClass('button-disabled')
    })

    $('#btn_9').click(function () {
        $('#btn_9').addClass('button-disabled')
    })

    $('#btn_10').click(function () {
        $('#btn_10').addClass('button-disabled')
    })

    $('#btn_11').click(function () {
        $('#btn_11').addClass('button-disabled')
    })

    $('#btn_12').click(function () {
        $('#btn_12').addClass('button-disabled')
    })

    $('#btn_13').click(function () {
        $('#btn_13').addClass('button-disabled')
    })

    $('#btn_14').click(function () {
        $('#btn_14').addClass('button-disabled')
    })

    $('#btn_15').click(function () {
        $('#btn_15').addClass('button-disabled')
    })

    $('#btn_16').click(function () {
        $('#btn_16').addClass('button-disabled')
    })

    $('#btn_17').click(function () {
        $('#btn_17').addClass('button-disabled')
    })

    $('#btn_18').click(function () {
        $('#btn_18').addClass('button-disabled')
    })

    $('#btn_19').click(function () {
        $('#btn_19').addClass('button-disabled')
    })

    $('#btn_20').click(function () {
        $('#btn_20').addClass('button-disabled')
    })

    $('#btn_21').click(function () {
        $('#btn_21').addClass('button-disabled')
    })

    $('#btn_22').click(function () {
        $('#btn_22').addClass('button-disabled')
    })

    $('#btn_23').click(function () {
        $('#btn_23').addClass('button-disabled')
    })

    $('#btn_24').click(function () {
        $('#btn_24').addClass('button-disabled')
    })

    $('#btn_25').click(function () {
        $('#btn_25').addClass('button-disabled')
    })
})
