const dictionary = require("../dictionary");
const games = require("../games");
const readline = require("readline");

const myInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
  prompt: "",
});

const gameArray = [
  { id: "1", game: games.knightDragonAndPrincessGame },
  { id: "2", game: games.poleChudesGame },
  { id: "3", game: games.makeWordGame },
  { id: "4", game: games.blackJackGame },
  { id: "5", game: games.trueOrFalseGame },
  { id: "6", game: games.dropCoin },
];

async function startGame(gameId) {
  const selectGame = gameArray.find((game) => game.id === gameId);
  if (selectGame) {
    const result = await selectGame.game();
    countResult(result);
    afterGame(gameId);
  } else {
    console.log(dictionary.global.wrongInput);
    startLauncher();
  }
}

function countResult(gameResult) {
  if (gameResult === "draw") {
    console.log(dictionary.global.draw);
  } else {
    console.log(gameResult ? dictionary.global.win : dictionary.global.lose);
  }
}

function startLauncher() {
  myInterface.question(dictionary.global.chooseGame, (answer) => {
    if (answer === "7") {
      stopLauncher();
    } else {
      startGame(answer);
    }
  });
}

function stopLauncher() {
  console.log(dictionary.global.goodbye);
  myInterface.close();
}

function afterGame(gameToRepeatId) {
  myInterface.question(dictionary.global.playAgain, (answer) => {
    if (answer === "1") {
      startGame(gameToRepeatId);
    }
    if (answer === "2") {
      startLauncher();
    }
    if (answer === "3") {
      stopLauncher();
    }
    //else {
    // Хотел добавить чтобы нельзя было ввести на этом этапе неверное значение, но не додумал пока как
    //console.log(dictionary.global.wrongInput)
    //startLauncher();

    // }
  });
}
module.exports = { run: startLauncher };
