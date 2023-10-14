$(document).ready(function () {
    const gameBoard = $(".game-board");
    const gameTimeDisplay = $('.game-time');
    const restartButton = $('.restart-button');
    const errorMessageDialog = $("#error-dialog")
    let gameTimer;
    let isGameRunning = false;
    let gameSequence = [];
  
    restartButton.on("click", () => {
      restartGame()
    })
  
    const fontSizes = [
      "font-small",
      "font-medium",
      "font-large",
      "font-xl",
      "font-xxl",
      "font-xxxl"
    ];
  
    const textColors = [
      "text-black",
      "text-red",
      "text-blue",
      "text-green",
      "text-orange",
      "text-purple"
    ];
  
    const boardDimensions = {
      rows: 5,
      columns: 5
    };
  
    const sequenceArray = createSequenceArray(25);
  
    const maxGameTime = 60;
  
    function decrementGameTime() {
      gameTimer = setTimeout(function () {
        const currentTime = gameTimeDisplay.text()
        const newTime = currentTime - 1;
  
        gameTimeDisplay.text(newTime);
  
        if (newTime > 0) {
          decrementGameTime()
        } else {
          endGameDueToTime()
        }
      }, 1000);
    }
  
    function showErrorDialog(title, text) {
      errorMessageDialog.text(text).attr("title", title).dialog({
        resizable: false,
        modal: true
      })
    }
  
    function endGameDueToTime() {
      showErrorDialog("Кінець гри", "Час вичерпано. Ви програли!")
      setupGame()
    }
  
    function endGameDueToIncorrectNumber() {
      showErrorDialog("Кінець гри", "Невірна цифра!")
      setupGame()
    }
  
    function createSequenceArray(n) {
      return Array.from({ length: n }, (_, i) => i + 1)
    }
  
    function setupGameCells() {
      const shuffledArray = shuffleAndGenerateRandomElement(sequenceArray);
      for (let i = 0; i < boardDimensions.rows * boardDimensions.columns; i++) {
        gameBoard.append(createCell(shuffledArray.next().value.toString()))
      }
    }
  
    function createCell(value) {
      let cellClassName = `game-cell
        ${textColors[Math.floor(Math.random() * textColors.length)]}
        ${fontSizes[Math.floor(Math.random() * fontSizes.length)]}`
  
      return $("<div></div>")
        .addClass(cellClassName)
        .text(value)
        .on("click", () => {
          if (isGameRunning) {
            addToGameSequence(value)
          }
        })
    }
  
    function addToGameSequence(value) {
      value = parseInt(value);
  
      if (gameSequence.length === 0) {
        gameSequence.push(value);
        return;
      }
  
      if (Math.abs(value - gameSequence[gameSequence.length - 1]) !== 1 || gameSequence.includes(value)) {
        endGameDueToIncorrectNumber();
        return;
      }
  
      gameSequence.push(value);
  
      if (gameSequence.length === 10) {
        showErrorDialog("Перемога", "Ви перемогли!");
        addResultToLocalStorage()
        setupGame();
      }
    }
  
    function addResultToLocalStorage() {
      const timeLeft = maxGameTime - parseInt(gameTimeDisplay.text());
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
  
    function* shuffleAndGenerateRandomElement(array) {
      const copiedArray = [...array];
  
      while (copiedArray.length > 0) {
        const randomIndex = Math.floor(Math.random() * copiedArray.length);
        const randomElement = copiedArray.splice(randomIndex, 1)[0];
        yield randomElement;
      }
    }
  
    function restartGame() {
      restoreGame()
      decrementGameTime()
      isGameRunning = true
    }
  
    function setupGame() {
      isGameRunning = false
      restoreGame()
    }
  
    function restoreGame() {
      gameSequence = []
      gameBoard.empty()
      clearTimeout(gameTimer)
      gameTimeDisplay.text(maxGameTime)
      setupGameCells();
    }
  
    setupGame()
  });
  