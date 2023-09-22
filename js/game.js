$(document).ready(function () {
  const boardDiv = $(".board");
  const timeDiv = $('.seconds');
  const restartButton = $('.restart-button');
  const dialogDiv = $("#dialog")
  let timer;
  let isGameStart = false
  let gameSeq = []

  restartButton.on("click", () => {
    restartGame()
  })

  const fontSize = [
    "font-small",
    "font-medium",
    "font-large",
    "font-xl",
    "font-xxl",
    "font-xxxl"
  ];

  const colors = [
    "color-black",
    "color-red",
    "color-blue",
    "color-green",
    "color-orange",
    "color-purple"
  ];

  const sizes = {
    rows: 5,
    cols: 5
  };

  const seqArr = fillSeqArray(25)

  const maxTime = 60

  function timerDecrement() {
    timer = setTimeout(function () {
      const currentTime = timeDiv.text()

      const newTime = currentTime - 1;

      timeDiv.text(newTime);

      if (newTime > 0) {
        timerDecrement()
      } else {
        lostTimeGame()
      }
    }, 1000);
  }

  function showDialog(title, text) {
    dialogDiv.text(text).attr("title", title).dialog({
      resizable: false,
      modal: true
    })
  }


  function lostTimeGame() {
    showDialog("Кінець", "Час закінчився. Ви програли!")
    setUpGame()
  }

  function lostNumberGame() {
    showDialog("Кінець", "Не вірна цифра!")
    setUpGame()
  }


  function fillSeqArray(n) {
    return Array.from({length: n}, (_, i) => i + 1)
  }

  function setUpCells() {
    const shuffleArr = shuffleAndYieldRandomElement(seqArr)
    for (let i = 0; i < sizes.rows * sizes.cols; i++) {
      boardDiv.append(createCell(shuffleArr.next().value.toString()))
    }
  }

  function createCell(value) {
    let className = `cell
      ${colors[Math.floor(Math.random() * colors.length)]}
      ${fontSize[Math.floor(Math.random() * fontSize.length)]}`

    return $("<div></div>")
      .addClass(className)
      .text(value)
      .on("click", () => {
        if (isGameStart) {
          addToSeqArr(value)
        }
      })
  }

  function addToSeqArr(value) {
    value = parseInt(value);

    if (gameSeq.length === 0) {
      gameSeq.push(value);
      return;
    }

    if (Math.abs(value - gameSeq[gameSeq.length - 1]) !== 1 || gameSeq.includes(value)) {
      lostNumberGame();
      return;
    }

    gameSeq.push(value);

    if (gameSeq.length === 10) {
      showDialog("Перемога", "Ви перемогли!");
      addResultToLocalStorage()
      setUpGame();
    }
  }

  function addResultToLocalStorage() {
    const timeLeft = 60 - parseInt(timeDiv.text());
    const gameNumber = getNextGameNumber();

    const results = getLocalStorageResults();
    results.push({
      id: `Гра ${gameNumber}`,
      time: `${timeLeft} с.`
    });

    localStorage.setItem("results", JSON.stringify(results));
  }

  function getLocalStorageResults() {
    const storedResults = localStorage.getItem("results");
    return storedResults ? JSON.parse(storedResults) : [];
  }

  function getNextGameNumber() {
    const results = getLocalStorageResults();
    const lastResult = results[results.length - 1];
    return lastResult ? parseInt(lastResult.id.split(" ")[1]) + 1 : 1;
  }

  function* shuffleAndYieldRandomElement(array) {
    const copyArray = [...array];

    while (copyArray.length > 0) {
      const randomIndex = Math.floor(Math.random() * copyArray.length);
      const randomElement = copyArray.splice(randomIndex, 1)[0];
      yield randomElement;
    }
  }

  function restartGame() {
    restoreGame()
    timerDecrement()
    isGameStart = true
  }

  function setUpGame() {
    isGameStart = false
    restoreGame()
  }

  function restoreGame() {
    gameSeq = []
    boardDiv.empty()
    clearTimeout(timer)
    timeDiv.text(maxTime)
    setUpCells();
  }

  setUpGame()
});





