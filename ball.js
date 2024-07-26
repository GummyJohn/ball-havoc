export class Ball{
  constructor(game, x, y, radius, speed){
    this.game = game;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.color = 'red'
  }

  update(){}

  touchPlayer(){}

  draw(context){}
}