class Balon {
  constructor(imagen) {
    this.x = width / 2; 
    this.y = height - 66; 
    this.speed = 1; 
    this.imagenBalonFutbol = imagenBalonFutbol;
   // this.radius = 66;
  }

  move() {
    
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5; 
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5; 
    }
  
    
    if (this.x - this.radius < 0) {
      this.x = this.radius; 
    } else if (this.x + this.radius > width) {
      this.x = width - this.radius; 
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
      
        return true;
      }
    }

    return false;
  }
}
