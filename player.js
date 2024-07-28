import { Projectile } from "./projectile.js";

export class Player {
  constructor(game) {
    this.game = game;
    this.width = 120;
    this.height = 120;
    this.x = this.game.width / 2 - this.width / 2;
    this.y = this.game.height - this.height;
    this.image = document.querySelector('#player');
    this.speed = 12;
    this.score = 0;
  }

  shoot() {
    const time = Date.now();
    const damage = 8 + (this.game.level - 1) * 2; 
    if (time - this.game.lastShot >= this.game.coolDown) {
      const projectile = new Projectile(this.game, this.x + this.width / 2, this.y, damage);
      this.game.projectiles.push(projectile);
      this.game.lastShot = time;
    }
  }

  update(keys) {
    if (keys.has('ArrowLeft') || keys.has('a')) {
      this.x -= this.speed;
      if (this.x < 0) {
        this.x = 0;
      }
    }

    if (keys.has('ArrowRight') || keys.has('d')) {
      this.x += this.speed;
      if (this.x > this.game.width - this.width) {
        this.x = this.game.width - this.width;
      }
    }

    if (keys.has(' ')) {
      this.shoot();
    }
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
