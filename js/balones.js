class Balon {
  constructor(imagen) {
    this.x = width / 2; // Posición inicial en el centro del borde inferior del canvas
    this.y = height - 66; // Posición inicial en el borde inferior del canvas
    this.speed = 1; // Velocidad de caída del balón
    this.imagenBalonFutbol = imagenBalonFutbol;
   // this.radius = 66;
  }

  move() {
    // Actualizar la posición del balón en función de la entrada del usuario
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5; // Mover hacia la izquierda
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5; // Mover hacia la derecha
    }
  
    // Verificar si el balón ha salido del canvas por los lados izquierdo o derecho
    if (this.x - this.radius < 0) {
      this.x = this.radius; // Limitar la posición a la derecha del canvas
    } else if (this.x + this.radius > width) {
      this.x = width - this.radius; // Limitar la posición a la derecha del canvas
    }
  }
  
  draw() {
    image(this.imagenBalonFutbol, this.x, this.y);
  }

  checkCollision(x, y) {
    // Verificar colisión con otro objeto en las coordenadas (x, y)
    let d = dist(this.x, this.y, x, y);
    return d < this.radius;
  }

  checkCollision(obstaculos) {
    for (let i = 0; i < obstaculos.length; i++) {
      let d = dist(this.x, this.y, obstaculos[i].x, obstaculos[i].y);
      let r = this.imagenBalonFutbol.width / 2 + obstaculos[i].imagenBalonFutbol.width / 2;

      if (d < r) {
        // Colisión detectada
        return true;
      }
    }

    return false;
  }
}
