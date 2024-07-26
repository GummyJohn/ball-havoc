import { Ball } from "./ball.js";
import { Player } from "./player.js";

export class Game{
  constructor(width, height){
    this.width = width;
    this.height = height;

    this.player = new Player(this);
    this.balls = [];
    this.level = 1;
    this.gameOver = false;
  }
  
  generateBalls(){}

  update(key){
    this.player.update(key)
  }
  
  draw(context){
    this.player.draw(context)
  }
}