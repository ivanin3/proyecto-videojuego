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
  imagenArboles = loadImage(
    "./fondos/layers/parallax-mountain-foreground-trees.png"
  );
  imagenBalonFutbol = loadImage("./balones/football.png");
  imagenBalonBaloncesto = loadImage("./balones/basketball.png");
  imagenBalonTennis = loadImage("./balones/tennis.png");
  imagenBalonGolf = loadImage("./balones/golf.png");
  imagenBalonBolos = loadImage("./balones/bowling.png");
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

  if (keyIsDown(RIGHT_ARROW)) {
    balon.speedX = 0.5;
  }

  balon.update();
  if (frameCount % 100 === 0) {
    obstaculos.push(new Obstaculo(width, random(height / 2, height - 100), 5));
  }

  if (frameCount % 170 === 0) {
    obstaculos.push(new Obstaculo(width, random(height / 2, height - 100), 5));
  }
  // OBSTACULOS EN LA BASE DEL JUEGO HACIA LA DERECHA
  if (frameCount % 100 === 0) {
    obstaculos.push(new Obstaculo(-300, 580, -5));
  }

  for (let i = obstaculos.length - 1; i >= 0; i--) {
    obstaculos[i].draw();
    obstaculos[i].update();

    if (obstaculos[i].offScreen()) {
      obstaculos.splice(i, 1);
    }
  }

  // BORDES DEL CANVAS PARA NO SUPERARLOS
  if (balon.x < 0) {
    balon.x = 0;
  } else if (balon.x + balon.imagenBalon.width > width) {
    balon.x = width - balon.imagenBalon.width;
  }

  if (balon.y < 0) {
    balon.y = 0;
  } else if (balon.y + balon.imagenBalon.height > height) {
    balon.y = height - balon.imagenBalon.height;
  }
}
