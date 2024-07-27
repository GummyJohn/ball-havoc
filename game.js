import { Player } from "./player.js";
import { Projectile } from "./projectile.js";

export class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = new Player(this);
    this.projectiles = []
    this.lastShot = 0;
    this.coolDown = 300;
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
  }

  draw(context) {
    this.player.draw(context);

    this.projectiles.forEach((projectile) => projectile.draw(context))
  }
}
