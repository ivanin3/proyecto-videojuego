class Obstaculo {
  constructor(imagen, obstaculos) {
    this.x = random(width); // Posición inicial aleatoria en el eje X
    this.y = 0; // Posición inicial en la parte superior del canvas
    this.speedX = random(-2, 2); // Velocidad inicial en el eje X (puede ser negativa para caer en diagonal)
    this.speedY = random(1, 3); // Velocidad inicial en el eje Y
    this.imagenBalonFutbol = imagenBalonFutbol;
    this.obstaculos = obstaculos;
  }

  update() {
    this.y += this.speedY; // Mover hacia abajo
    this.x += this.speedX; // Mover en el eje X
  
    if (this.x > width || this.x < 0) {
      this.speedX *= -1; // Cambiar la dirección del obstáculo en el eje X
    }
  
    this.checkCollision(); // Verificar colisiones
  }
     
  
  draw() {
    image(this.imagenBalonFutbol, this.x, this.y)
  }


  checkCollision() {
    for (let i = 0; i < this.obstaculos.length; i++) {
      if (this !== this.obstaculos[i]) {
        let d = dist(this.x, this.y, this.obstaculos[i].x, this.obstaculos[i].y);
        let r = this.imagenBalonFutbol.width / 2;
  
        if (d < r * 2) {
          // Cambiar dirección en el eje X
          this.speedX *= -1;
        }
      }
    }
  }
  
  
}


