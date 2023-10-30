const resultsTable = document.getElementById("game-results");

const gameResults = JSON.parse(localStorage.getItem("results"));

const minTime = Math.min(...gameResults.map(result => result.time));

gameResults.forEach(result => {
    const tableRow = document.createElement("tr");
    const gameIdCell = document.createElement("td");
    gameIdCell.textContent = result.id;
    const gameTimeCell = document.createElement("td");
    gameTimeCell.textContent = result.time;
    tableRow.appendChild(gameIdCell);
    tableRow.appendChild(gameTimeCell);

    if (result.time === minTime) {
        tableRow.classList.add("bg-lime");
    }

    resultsTable.appendChild(tableRow);
});
