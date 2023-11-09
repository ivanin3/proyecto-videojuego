class Obstaculo {
  constructor(x, y, velocidad) {
    this.x = x; 
    this.y = y; 
    this.velocidad = velocidad;
    this.imagenObstaculo = imagenObstaculo;
  }

  draw() {
    image(this.imagenObstaculo, this.x, this.y); 
  }

  update() {
    this.x -= this.velocidad; 
  }

  offScreen() {
    return this.x + this.imagenObstaculo.width < 0; 
  }
}
