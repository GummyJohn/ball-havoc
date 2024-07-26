export class Projectile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 20;
    this.speed = 10; 
  }

  update() {
    this.y -= this.speed; 
  }

  draw(context) {
    context.fillStyle = 'red'; 
    context.fillRect(this.x, this.y, this.width, this.height); 
  }

  isOffScreen() {
    return this.y + this.height <= 0;
  }
}
