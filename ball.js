export class Ball {
  constructor(game, x, y, radius) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.gravity = 0.3; 
    this.speed = 6;

    this.dx = 3;
    this.dy = this.speed * 1.5;
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
    }
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

    context.fillText(this.radius.toFixed(0), this.x, this.y);
  }

  isOffScreen() {
    return (
      this.x + this.radius <= 0 ||
      this.x - this.radius >= this.game.width ||
      this.y + this.radius <= 0 ||
      this.y - this.radius >= this.game.height
    );
  }
}
