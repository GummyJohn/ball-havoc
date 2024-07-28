import { Game } from "./game.js";

const canvas = document.querySelector('#canvas');
const cxt = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const game = new Game(canvas.width, canvas.height);
const keys = new Set();

function handleAddKeys(e){
  keys.add(e.key)
  
  if(game.gameOver && e.key === 'Enter'){
    game.restart()
  }
}

function handleRemoveKeys(e){
  keys.delete(e.key)
}

window.addEventListener('keydown', handleAddKeys);
window.addEventListener('keyup', handleRemoveKeys)

function animate() {
  cxt.clearRect(0, 0, canvas.width, canvas.height);
  game.update(keys)
  game.draw(cxt);
  requestAnimationFrame(animate);
}

animate();
