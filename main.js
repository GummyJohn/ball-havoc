import { Game } from "./classes/game.js";

const canvas = document.querySelector("#canvas");
const splashScreen = document.querySelector('#splashscreen')
const startButton = document.querySelector('#startbutton');
const cxt = canvas.getContext("2d");

let game;
const keys = new Set();

function handleAddKeys(e) {
  keys.add(e.key);

  if (game.gameOver && e.key === "Enter") {
    game.restart();
  }

  if(game.beatGame && e.key === "Enter") {
    game.restart();
  }
}

function handleRemoveKeys(e) {
  keys.delete(e.key);
}

window.addEventListener("keydown", handleAddKeys);
window.addEventListener("keyup", handleRemoveKeys);

function startGame(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  game = new Game(canvas.width, canvas.height)

  function animate() {
    cxt.clearRect(0, 0, canvas.width, canvas.height);
    game.update(keys);
    game.draw(cxt);
    requestAnimationFrame(animate);
  }
  
  animate();
}

startButton.addEventListener('click', () => {
  splashScreen.style.display  = 'none';
  canvas.style.block = 'block';
  startGame();
})
