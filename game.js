import { Player } from "./player.js";
import { Projectile } from "./projectile.js";

export class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = new Player(this);
    this.projectile = null
  }

  shoot(){
    if(!this.projectile) {
      this.projectile = new Projectile(this.player.x + 65, this.player.y);
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

    if (this.projectile) {
      this.projectile.update();

      if (this.projectile.isOffScreen()) {
        this.projectile = null;
      }
    }
  }

  draw(context) {
    this.player.draw(context);
    if (this.projectile) {
      this.projectile.draw(context);
    }
  }
}
