let balon;
let obstaculos = [];
let imagenGameOver;
let tiempoInicio;
let duracionNivel = 30 * 1000;
let nivelPasado = false;
let tiempoRestante;
let nivel = 1;
let numeros = [];
let juegoIniciado = false;



function preload() {
  imagenBalonFutbol = loadImage("./balones/football.png");
  imagenBalonBaloncesto = loadImage("./balones/basketball.png");
  imagenBalonTennis = loadImage("./balones/tennis.png");
  imagenBalonGolf = loadImage("./balones/golf.png");
  imagenBalonBolos = loadImage("./balones/bowling.png");
  imagenGameOver = loadImage("./imagenes-adicionales/gameover.png");
  imagenFondo = loadImage("./fondos/layers/parallax-mountain-bg.png");
  imagenMontañas = loadImage("./fondos/layers/parallax-mountain-mountains.png");
  imagenArboles = loadImage("./fondos/layers/parallax-mountain-foreground-trees.png");
  for (let i = 0; i <= 9; i++) {
    numeros.push(loadImage('./numeros/' + i + '.png'));
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
      image(imagenGameOver, 200, 100, 800, 300);
      setTimeout(function () {
        obstaculos = [];
        balon = new Balon();
        tiempoInicio = millis();
        nivelPasado = false; 
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

    if (tiempoRestante <= 0 && !nivelPasado) {
      nivelPasado = true;

      if (cumplioRequisitosNivel1()) {

        setTimeout(function () {
          nivel++;

          
            
            obstaculo = new Obstaculo(imagenBalonTennis);
            obstaculos = [];
            balon = new Balon(imagenBalonTennis);
            tiempoInicio = millis();
            duracionNivel = 35 * 1000; 
            Balon.velocidad = 4; 
            Obstaculo.velocidad = -2; 
          }, 3000); 

        
        textSize(50);
        fill(255);
        textAlign(CENTER, CENTER);
        text("NIVEL 2", width / 2, height / 2);
      } else {
        
        obstaculos = [];
        balon = new Balon();
        tiempoInicio = millis();
        duracionNivel = 30 * 1000; 
      }
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

function cumplioRequisitosNivel1() {

  for (let i = 0; i < obstaculos.length; i++) {
    if (balon.checkCollision([obstaculos[i]]) || tiempoRestante > 0) {
      return false; 
    }
  }
  return true; 
}