$(document).ready(function() {
    function displayResults() {
        const gameAttempts = JSON.parse(localStorage.getItem("gameAttempts") || "[]");
        
        const table = $("#resultsTable");
        gameAttempts.forEach(attempt => {
            table.append(`
                <tr>
                    <td>${attempt.name}</td>
                    <td>${attempt.time}</td>
                </tr>
            `);
        });
    }

    $("#playAgain").on("click", function() {
        window.location.href = 'game.html';
    });

    displayResults();
});
