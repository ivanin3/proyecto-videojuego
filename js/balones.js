class Balon {
  constructor(x, y, imagenBalonFutbol, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.speeed = 0;
    this.gravityValue = 0.5;
    this.speedY = speedY;
    this.speedX = speedX;
    this.imagenBalon = imagenBalonFutbol;
  }

  draw() {
    image(this.imagenBalon, this.x, this.y);
  }

  update() {
    this.speedY += this.gravityValue;
    this.y += this.speedY;
  }
  

  jump() {
    this.speedY = -10;
    this.y += this.speedY;
  }
}

function keyPressed() {
  if (keyCode === 32) {
      balon.jump();
  } 
}
