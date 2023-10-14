$(document).ready(function () {

    function createResultTableRow(result) {
      return $(`<tr><td>${result.id}</td><td>${result.time}</td></tr>`);
    }
  
    const gameResults = JSON.parse(localStorage.getItem("results"));
  
    if (gameResults) {
      const $resultTable = $(".result-table");
  
      let smallestTimeObj = gameResults[0];
  
      for (let i = 1; i < gameResults.length; i++) {
        const currentTime = parseInt(gameResults[i].time);
        const smallestTime = parseInt(smallestTimeObj.time);
  
        if (currentTime < smallestTime) {
          smallestTimeObj = gameResults[i];
        }
      }
  
      smallestTimeObj.smallest = true
  
      gameResults.forEach(result => {
        const tr = createResultTableRow(result);
  
        if(result.smallest) {
          tr.addClass("smallest-time")
        }
  
        $resultTable.append(tr);
      });
    }
  });
  