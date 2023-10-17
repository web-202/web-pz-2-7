$(document).ready(function() {
    $('#startGame').on('click', function() {
        window.location.href = 'game.html';  
    });
});

let gameAttempts = []; 

function endGame(successful, timeTaken) {
    if (successful) {
        alert("³����! ��� ����������� ������!");
    } else {
        alert("��������� �� ���.");
    }


    gameAttempts.push({
        name: "���" + (gameAttempts.length + 1),
        time: timeTaken
    });

    updateStatistics();
    $("#statistics").show();
    restartGame();
}

function updateStatistics() {
    const table = $("#statistics table");
    table.find("tr:gt(0)").remove(); 

    gameAttempts.forEach(attempt => {
        table.append(`
            <tr>
                <td>${attempt.name}</td>
                <td>${attempt.time}�</td>
            </tr>
        `);
    });
}