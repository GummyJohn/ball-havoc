export class Ball {
  constructor(game, x, y, radius, life) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.life = life;
    this.radius = radius;

    this.gravity = 0.5; 
    this.speed = 6;

    this.dx = 3;
    this.dy = this.speed * 1;
  }

  update() {
    this.dy += this.gravity;

    this.x += this.dx;
    this.y += this.dy;

    if ((this.x + this.radius) > this.game.width) {
      this.dx = -this.dx; 
      this.x = this.game.width - this.radius;
    }

    if ((this.x - this.radius) < 0) {
      this.dx = -this.dx; 
      this.x = this.radius;
    }

    if ((this.y - this.radius) < 0) {
      this.dy = -this.dy; 
      this.y = this.radius;
    }

    if ((this.y + this.radius) > this.game.height) {
      this.dy = -this.dy; 
      this.y = this.game.height - this.radius;

      if (this.y + this.radius > this.game.height - 10) {
        this.y = this.game.height - this.radius - 10;
      }
    }
  }

  takeDamage(damage){
    this.life -= damage
  }

  removeBall(){
    const index = this.game.balls.indexOf(this)

    if(index !== -1){
      this.game.balls.splice(index, 1)
      this.game.totalBalls--
      if(this.game.totalBalls === 0){
        this.game.nextLevel()
      }
    }
  }

  getDistance(x1, y1, x2, y2){
    let distX = x2 - x1;
    let distY = y2 - y1;

    return Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2))
  }

  checkHit(projectile){
    const distance = this.getDistance(this.x, this.y, projectile.x, projectile.y)
    if(distance < this.radius + projectile.width){
      this.takeDamage(projectile.damage);
      return true;
    }

    return false;
  }

  draw(context) {
    context.beginPath();
    context.fillStyle = 'blue';
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
    context.closePath();

    context.font = '30px Arial';
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    context.fillText(this.life.toFixed(0), this.x, this.y);
  }

}
