import { Game } from "./game.js";

const canvas = document.querySelector('#canvas');
const cxt = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const game = new Game(canvas.width, canvas.height);
let keys = new Set()

window.addEventListener('keydown', (e) => {
  keys.add(e.key)
});

window.addEventListener('keyup', (e) => {
  keys.delete(e.key)
})

function animate() {
  cxt.clearRect(0, 0, canvas.width, canvas.height);
  game.update(keys)
  game.draw(cxt);
  requestAnimationFrame(animate);
}

animate();
