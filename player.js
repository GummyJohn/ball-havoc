export class Player {
  constructor(game) {
    this.game = game;
    this.width = 120;
    this.height = 120;
    this.x = this.game.width / 2 - this.width / 2;
    this.y = this.game.height - this.height;
    this.image = document.querySelector('#player');
    this.speed = 7;
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
