import { Player } from "./player.js";
import { Projectile } from "./projectile.js";
import { Ball } from "./ball.js";

export class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = new Player(this);
    this.balls = [new Ball(this, 300, 300, 50)]
    this.projectiles = []
    this.lastShot = 0;
    this.coolDown = 300;

    // this.generateBalls()
  }

  generateBalls(){
    setInterval(() => {
      const randomX = Math.random() * this.width
      const randomY = 0.5 * this.height;
      const randomR = (Math.random() * (70 - 20)) + 20
      const ball = new Ball(this, randomX, randomY, randomR);
      this.balls.push(ball)
    }, 10000)
  }

  shoot(){
    const time = Date.now()
    if(time - this.lastShot >= this.coolDown){
      const projectile = new Projectile(this.player.x + 65, this.player.y);
      this.projectiles.push(projectile)
      this.lastShot = time;
    }
  }

  update(keys) {
    if (keys.has('ArrowLeft') || keys.has('a')) {
      this.player.x -= this.player.speed;
      if (this.player.x < 0) {
        this.player.x = 0;
      }
    }

    if (keys.has('ArrowRight') || keys.has('d')) {
      this.player.x += this.player.speed;
      if (this.player.x > this.width - this.player.width) {
        this.player.x = this.width - this.player.width
      }
    }

    if(keys.has(' ')){
      this.shoot()
    }

    this.projectiles.forEach((projectile) => {
      projectile.update();

      if(projectile.isOffScreen()){
        const index = this.projectiles.indexOf(projectile);
        if(index !== -1){
          this.projectiles.splice(index, 1)
        }
      }
    })

    this.balls.forEach((ball) => ball.update())
  }

  draw(context) {
    this.player.draw(context);
    this.projectiles.forEach((projectile) => projectile.draw(context))
    this.balls.forEach((ball) => ball.draw(context))
  }
}
