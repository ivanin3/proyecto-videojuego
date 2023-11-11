let balon;
let obstaculos = [];
let imagenGameOver;
let tiempoInicio;
let duracionNivel = 5 * 1000;
let nivelPasado = false;
let tiempoRestante;
let nivel = 1;
let numeros = [];
let juegoIniciado = false;
let velocidadObstaculos = 2;
let velocidadBalon = 1;

function preload() {
  imagenBalonFutbol = loadImage("./balones/football.png");
  imagenBalonBaloncesto = loadImage("./balones/basketball.png");
  imagenBalonTennis = loadImage("./balones/tennis.png");
  imagenBalonGolf = loadImage("./balones/golf.png");
  imagenBalonBolos = loadImage("./balones/bowling.png");
  imagenGameOver = loadImage("./imagenes-adicionales/gameover.png");
  imagenFondo = loadImage("./fondos/layers/parallax-mountain-bg.png");
  imagenMontañas = loadImage("./fondos/layers/parallax-mountain-mountains.png");
  imagenArboles = loadImage(
    "./fondos/layers/parallax-mountain-foreground-trees.png"
  );
  for (let i = 0; i <= 9; i++) {
    numeros.push(loadImage(`./numeros/${i}.png`));
  }
}

function setup() {
  createCanvas(1200, 600);
  imagenFondo.resize(width, height);
  imagenMontañas.resize(width, height);
  imagenArboles.resize(width, height);
  balon = new Balon();
  tiempoInicio = millis();
  tiempoRestante = duracionNivel;
}

function draw() {
  if (juegoIniciado) {
    image(imagenFondo, 0, 0);
    image(imagenMontañas, 0, 0);
    image(imagenArboles, 0, 0);
    balon.draw();
    balon.move();

    if (balon.checkCollision(obstaculos)) {
      noLoop();
      image(imagenGameOver, 200, 100, 800, 300);
      setTimeout(function () {
        nivel = 1;
        obstaculos = [];
        balon = new Balon();
        tiempoInicio = millis();
        loop();
      }, 3000);
      return;
    }

    if (frameCount % 60 === 0) {
      obstaculos.push(new Obstaculo(imagenBalonFutbol, obstaculos));
    }

    for (let i = obstaculos.length - 1; i >= 0; i--) {
      obstaculos[i].update();
      obstaculos[i].draw();

      if (obstaculos[i].y > height + obstaculos[i].imagenBalonFutbol.height) {
        obstaculos.splice(i, 1);
      }
    }

    tiempoRestante = duracionNivel - (millis() - tiempoInicio);

    if (tiempoRestante <= 0) {
      nivel++;
      cambiarNivel();
    }

    let segundos = floor(tiempoRestante / 1000);
    let unidades = segundos % 10;
    let decenas = floor(segundos / 10);

    image(numeros[decenas], 20, 40);
    image(numeros[unidades], 60, 40);
  } else {
    // Pantalla de inicio
    image(imagenFondo, 0, 0);
    image(imagenMontañas, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(50);
    fill(255);
    text("Pulsa cualquier tecla para comenzar", width / 2, height / 2);

    if (keyIsPressed) {
      juegoIniciado = true;
      tiempoInicio = millis();
    }
  }
}

function cambiarNivel() {
  noLoop();
  textSize(50);
  fill(255);
  textAlign(CENTER, CENTER);
  text("NIVEL " + nivel, width / 2, height / 2);

  setTimeout(function () {
    velocidadBalon--; 
    velocidadObstaculos++;

    let cantidadObstaculos = 10 + nivel * 2; 
    obstaculos = [];
    for (let i = 0; i < cantidadObstaculos; i++) {
      obstaculos.push(new Obstaculo(imagenBalonFutbol, obstaculos));
    }

    tiempoInicio = millis();
    duracionNivel += 5000; 
    loop();
  }, 3000);
}
