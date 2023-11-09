let imagenFondo;
let imagenBalonFutbol;
let imagenBalonBaloncesto;
let imagenBalonTennis;
let imagenBalonGolf;
let imagenBalonBolos;
let obstaculos = [];
let imagenObstaculo;
let imagenMontaña;
let imagenArboles;
let balon;

function preload() {
  imagenFondo = loadImage("./fondos/layers/parallax-mountain-bg.png");
  imagenObstaculo = loadImage("./imagenes-adicionales/obstaculo.png");
  imagenMontaña = loadImage("./fondos/layers/parallax-mountain-mountains.png");
  imagenArboles = loadImage("./fondos/layers/parallax-mountain-foreground-trees.png");
  imagenBalonFutbol = loadImage('./balones/football.png');
  imagenBalonBaloncesto = loadImage('./balones/basketball.png');
  imagenBalonTennis = loadImage('./balones/tennis.png');
  imagenBalonGolf = loadImage('./balones/golf.png');
  imagenBalonBolos = loadImage('./balones/bowling.png');
}

function setup() {
  createCanvas(1200, 600);
  imagenFondo.resize(width, height);
  imagenMontaña.resize(width, height);
  imagenArboles.resize(width, height);
  balon = new Balon(100, 100, imagenBalonFutbol, 0, 0); 

}

function draw() {
  image(imagenFondo, 0, 0);
  image(imagenMontaña, 0, 0);
  image(imagenArboles, 0, 0);
  balon.draw();
  balon.update();
  
  
  if (frameCount %  100 === 0) {
    obstaculos.push(new Obstaculo(width, random(height / 2, height - 100), 5));
  }

  if (frameCount %  170 === 0) {
    obstaculos.push(new Obstaculo(width, random(height / 2, height - 100), 5));
  }

  if (frameCount %  100 === 0) {
    obstaculos.push(new Obstaculo(-300, 580, -5));
  }

  for (let i = obstaculos.length - 1; i >= 0; i--) {
    obstaculos[i].draw();
    obstaculos[i].update();


    if (obstaculos[i].offScreen()) {
      obstaculos.splice(i, 1);
    }
  }
}

