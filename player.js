export class Player{
  constructor(game){
    this.game = game;
    this.width = 120;
    this.height = 120;
    this.x = this.game.width / 2;
    this.y = this.game.height - this.height;
    this.image = document.querySelector('#player');
    this.speed = 50;
  }

  update(input){
    if(input === 'ArrowLeft' || input === 'a'){
      this.x -= this.speed;
      if(this.x < 0){
        this.x = 0;
      }
    }

    if(input === 'ArrowRight' || input === 'd'){
      this.x += this.speed;
      if(this.x > this.game.width - this.width){
        this.x = this.game.width - this.width
      }
    }
  }


  draw(context){
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}