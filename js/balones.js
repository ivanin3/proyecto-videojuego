class Balon {
  constructor(x, y, imagenBalonFutbol, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.speeed = 0;
    this.gravityValue = 0.5;
    this.speedY = speedY;
    this.speedX = speedX;
    this.imagenBalon = imagenBalonFutbol;
    this.isJumping = false;
  }

  draw() {
    image(this.imagenBalon, this.x, this.y);
  }

  update() {
    this.x += this.speedX;
    this.speedY += this.gravityValue;
    this.y += this.speedY;

    for (let i = 0; i < obstaculos.length; i++) {
      const obstacle = obstaculos[i];
      if (
        this.x + this.imagenBalon.width > obstacle.x &&
        this.x < obstacle.x + obstacle.imagenObstaculo.width &&
        this.y + this.imagenBalon.height >= obstacle.y &&
        this.y < obstacle.y + obstacle.imagenObstaculo.height
      ) {
        this.y = obstacle.y - this.imagenBalon.height;
        this.isJumping = false;
        break;
      }
    }
  }

  jump() {
    if (!this.isJumping) {
      this.speedY = -15;
      this.y += this.speedY;
      this.isJumping = true;
    }
  }
}

function keyPressed() {
  if (keyCode === 32) {
    balon.jump();
  }
}
