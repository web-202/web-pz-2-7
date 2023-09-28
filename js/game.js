function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

$(() => {

  let results = []
  let temp = []
  let marker = "center"

  let isRunning = false;
  let startTime;
  let interval;
  let time;

  createTable(generateRandomTable())
  getResults()

  function getResults() {
    $(".results").empty()
    if (localStorage.getItem("results")) {
      results = JSON.parse(localStorage.getItem("results"))
      $(() => {
        for (let i = 0; i < results.length; i++) {
          const name = $(`<div>${results[i].name}</div>`)
          const time = $(`<div>${results[i].time}</div>`)
          if (i !== results.length - 1) {
            name.addClass("results__item")
            time.addClass("results__item")
          } else {
            name.addClass("results__item_last")
            time.addClass("results__item_last")
          }
          $(".results").append(name[0], time[0])
        }
      })
    }
  }

  function saveResults() {
    localStorage.setItem("results", JSON.stringify(results))
  }

  function addNewResult(result) {
    results.push(result)
    saveResults()
  }

  function generateRandomTable() {
    let colors = ["#862626", "#44622c", "#4c99d0", "#252121", "#860f19", "#866262", "#3acc5c", "#ef502c", "#d319d9", "#e71313",]
    let sizes = ["12px", "14px", "16px", "18px", "20px", "24px", "32px", "34px", "36px", "38px"]

    let result = []

    let set = new Set()
    while (set.size !== 25) {
      set.add(getRandomInt(25))
    }

    set.forEach(item => {
      result.push(item + 1)
    })

    for (let i = 0; i < result.length; i++) {
      result[i] = ({color: colors[getRandomInt(10)], size: sizes[getRandomInt(10)], value: result[i]})
    }

    return result;
  }

  function calculateGame(id) {
    if (temp.length === 0) {
      temp.push(id)
      $(`#${id}`).addClass("correctly-answered")
      start()
      marker = id > 15 ? "left" : "right"
      marker = id < 10 ? "right" : "left"
      if (id >= 10 && id <= 16) {
        marker = "center"
      }
      console.log(marker)
    } else if (Math.abs(Number(id) - temp[temp.length - 1]) === 1 && marker === "right" && Number(id) > temp[temp.length - 1]) {
      temp.push(id)
      $(`#${id}`).addClass("correctly-answered")
    } else if (temp[temp.length - 1] - Number(id) === 1 && marker === "left" && Number(id) < temp[temp.length - 1]) {
      temp.push(id)
      $(`#${id}`).addClass("correctly-answered")
    } else if (marker === "center" && Math.abs(Number(id) - temp[temp.length - 1]) === 1) {
      temp.push(id)
      $(`#${id}`).addClass("correctly-answered")
    } else {
      if (!temp.includes(id)) {
        $(`#${id}`).css("background", "#e15a5a");
        setTimeout(function () {
          $(`#${id}`).css("background", "#d5cdcd");
        }, 1000);
      }
    }

    if (temp.length === 10) {
      stop()
      addNewResult({name: `Гра ${results.length + 1}`, time: time})
      getResults()
      $("#popup").fadeIn();
    }

  }

  function createTable(result) {
    let counter = 0;
    for (let i = 0; i < 5; i++) {
      const row = $("<div></div>")
      row.addClass("row")
      for (let j = 0; j < 5; j++) {
        const cell = $("<button></button>")
        cell.addClass("cell")

        cell.css("font-size", result[counter].size)
        cell.css("color", result[counter].color)

        cell.text(result[counter].value)
        cell.attr("id", result[counter].value)
        cell.id = result[counter].value

        cell.on("click", () => {
          calculateGame(cell.id)
        })

        row.append(cell[0])
        counter++
      }
      $(".game-table").append(row)
    }
  }


  function updateDisplay() {
    const currentTime = new Date().getTime();
    const elapsedTime = new Date(currentTime - startTime);
    const hours = elapsedTime.getUTCHours().toString().padStart(2, '0');
    const minutes = elapsedTime.getUTCMinutes().toString().padStart(2, '0');
    const seconds = elapsedTime.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = elapsedTime.getUTCMilliseconds().toString().padStart(3, '0');
    time = `${hours}:${minutes}:${seconds}.${milliseconds}`
    $('#display').text(`${hours}:${minutes}:${seconds}.${milliseconds}`);
  }

  function start() {
    if (!isRunning) {
      isRunning = true;
      startTime = new Date().getTime() - (startTime ? startTime : 0);
      interval = setInterval(updateDisplay, 10);
    }
  }

  function stop() {
    if (isRunning) {
      isRunning = false;
      clearInterval(interval);
    }
  }

  function reset() {
    isRunning = false;
    clearInterval(interval);
    startTime = 0;
    $('#display').text('00:00:00.000');
  }

  $(".popup-content").click(function (e) {
    e.stopPropagation();
  })

  $("#start-new-game").click(() => {
    $(".game-table").empty()
    reset()
    temp = []
    createTable(generateRandomTable())
    $("#popup").fadeOut();
  })
});




