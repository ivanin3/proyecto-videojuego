class Obstaculo {
  constructor(imagen, obstaculos) {
    this.x = random(width); 
    this.y = 0; 
    this.speedX = random(-2, 2); 
    this.speedY = random(1, 3); 
    this.imagenBalonFutbol = imagenBalonFutbol;
    this.obstaculos = obstaculos;
  }

  update() {
    this.y += this.speedY; 
    this.x += this.speedX; 
  
    if (this.x > width || this.x < 0) {
      this.speedX *= -1; 
    }
  
    this.checkCollision(); 
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
          
          this.speedX *= -1;
        }
      }
    }
  }
  
  
}


