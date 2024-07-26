import { Game } from "./game.js";

const canvas = document.querySelector('#canvas');
const cxt = canvas.getContext('2d')
canvas.width= window.innerWidth;
canvas.height= window.innerHeight;

const game = new Game(canvas.width, canvas.height)

window.addEventListener('keydown', (e) => {
  game.update(e.key);
})

function animte(){
  cxt.clearRect(0, 0, canvas.width, canvas.height);
  game.draw(cxt)
  requestAnimationFrame(animte)
}

animte()




