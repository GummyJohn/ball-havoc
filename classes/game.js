import { Player } from "./player.js";
import { Ball } from "./ball.js";

export class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = new Player(this);
    this.balls = [new Ball(this, 300, 300, 50, 50)];
    this.projectiles = [];

    this.lastShot = 0;
    this.coolDown = 300;

    this.gameOver = false;
    this.beatGame = false;
    this.level = 1;
    this.ballInterval = null;
    this.totalBalls = 0;

    this.startLevel();
  }

  startLevel() {
    this.balls = [];
    this.projectiles = [];
    this.totalBalls = this.level * 7;

    this.generateBalls();
  }

  generateBalls() {
    if (this.ballInterval) {
      clearInterval(this.ballInterval);
    }

    this.ballInterval = setInterval(() => {
      if (this.balls.length < this.totalBalls) {
        const randomR = Math.random() * (70 - 30) + 30;
        const edge = Math.floor(Math.random() * 2);

        let randomX;
        let randomY = 0.2 * this.height;

        if (edge === 0) {
          randomX = 0 - randomR;
        } else {
          randomX = this.width + randomR;
        }

        const ball = new Ball(this, randomX, randomY, randomR, randomR);
        this.balls.push(ball);
      }
    }, Math.max(5000 - (this.level - 1) * 1000, 1500));
  }

  update(keys) {
    if (this.gameOver) return;
    this.player.update(keys);

    this.projectiles.forEach((projectile) => {
      projectile.update();

      if (projectile.isOffScreen()) {
        projectile.removeProjectile(projectile);
      }
    });

    this.balls.forEach((ball) => {
      ball.update();

      if (ball.life < 1) {
        ball.removeBall();
        this.player.score = this.player.score + ball.radius * 10;
      }

      this.projectiles.forEach((projectile) => {
        if (ball.checkHit(projectile)) {
          projectile.removeProjectile(projectile);
        }
      });
    });

    this.checkGameOver();
    this.finished();
  }

  finished() {
    if (this.level === 6 && this.balls.length === 0) {
      this.beatGame = true;
    }
  }

  checkGameOver() {
    this.balls.forEach((ball) => {
      const distance = ball.getDistance(
        ball.x,
        ball.y,
        this.player.x + this.player.width / 2,
        this.player.y + this.player.height / 2
      );

      if (distance < this.player.width / 2) {
        this.gameOver = true;
      }
    });
  }

  restart() {
    this.level = 1;
    this.player.score = 0;
    this.gameOver = false;
    this.beatGame = false;
    this.startLevel();
  }

  nextLevel(){
    this.level++
    this.player.shootSpeed += 5;
    this.startLevel()
  }

  draw(context) {
    if (this.gameOver) {
      context.clearRect(0, 0, this.width, this.height);

      // Display "Game Over"
      context.font = "50px Arial";
      context.fillStyle = "red";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText("Game Over", this.width / 2, this.height / 2 - 50);

      // Display the level and score
      context.font = "30px Arial";
      context.fillStyle = "blue";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(`Level: ${this.level}`, this.width / 2, this.height / 2);
      context.fillText(
        `Score: ${this.player.score.toFixed(0)}`,
        this.width / 2,
        this.height / 2 + 40
      );

      // Draw retry message
      context.font = "40px Arial";
      context.fillStyle = "blue";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(
        "Press Enter to Retry",
        this.width / 2,
        this.height / 2 + 100
      );

      return;
    }

    if (this.beatGame) {
      context.font = "50px Arial";
      context.fillStyle = "#a84e4e";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(
        "Congratulations, You've Beat My Game!",
        this.width / 2,
        this.height / 2
      );

      context.fillStyle = 'blue';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText('Press Enter To play Again', this.width / 2, this.height / 2 + 100)
      return;
    }

    this.player.draw(context);
    this.projectiles.forEach((projectile) => projectile.draw(context));
    this.balls.forEach((ball) => ball.draw(context));
  }
}
