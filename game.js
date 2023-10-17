$(document).ready(function () {
    let currentNumber = 1;
    const fontSizes = ['12px', '14px', '18px', '22px', '26px'];
    const timerSpan = $("#timer");
    let interval;
    let gameAttempts = [];

    function generateRandomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    function endGame(successful, timeTaken) {
        clearInterval(interval); // Зупиняємо таймер

        if (successful) {
            alert("Вітаємо! Гра завершилась успішно!");
        } else {
            alert("Спробуйте ще раз.");
        }

        gameAttempts.push({
            name: "Гра" + (gameAttempts.length + 1),
            time: timeTaken
        });

        if (gameAttempts.length % 3 === 0) {
            updateStatistics();
            $("#statistics").show();
        }

        startGame();
    }

    function updateStatistics() {
        const table = $("#statistics table");
        table.find("tr:gt(0)").remove();

        let bestTime = Math.min(...gameAttempts.map(attempt => attempt.time));

        gameAttempts.forEach(attempt => {
            let isBestTime = attempt.time === bestTime;
            let rowColor = isBestTime ? 'orange' : 'lightblue';
            table.append(`
                <tr style="background-color: ${rowColor}">
                    <td>${attempt.name}</td>
                    <td>${attempt.time}с</td>
                </tr>
            `);
        });
    }

    function startGame() {
        currentNumber = 1;
        $("#numbersTable").empty();
        let numbers = Array.from({ length: 20 }, (_, i) => i + 1);
        numbers.sort(() => Math.random() - 0.5);

        for (let i = 0; i < 4; i++) {
            let row = $("<tr></tr>");
            for (let j = 0; j < 5; j++) {
                let number = numbers[i * 5 + j];
                let cell = $(`<td class="number-box">${number}</td>`);
                cell.css({
                    'font-size': fontSizes[Math.floor(Math.random() * fontSizes.length)],
                    'color': generateRandomColor()
                });
                cell.on('click', function () {
                    if ($(this).text() == currentNumber) {
                        $(this).css('background-color', 'lightgreen');
                        currentNumber++;
                        if (currentNumber > 20) {
                            endGame(true, 60 - parseInt(timerSpan.text()));
                        }
                    } else {
                        endGame(false, 60 - parseInt(timerSpan.text()));
                    }
                });
                row.append(cell);
            }
            $("#numbersTable").append(row);
        }

        clearInterval(interval);
        let timer = 60;
        interval = setInterval(() => {
            timer--;
            timerSpan.text(timer);
            if (timer <= 0) {
                endGame(false, 60);
            }
        }, 1000);
    }

    $("#restart").click(function () {
        location.reload();
    });

    startGame();
});
