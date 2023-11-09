let balon;
let obstaculos = [];
let obstaculo;
let imagenGameOver;
let tiempoInicio;
let duracionNivel = 30 * 1000; // 30 segundos en milisegundos
let nivelPasado = false;
let tiempoRestante;
let nivel = 1;
let numeros = [];



function preload() {
  imagenBalonFutbol = loadImage("./balones/football.png");
  imagenBalonBaloncesto = loadImage("./balones/basketball.png");
  imagenBalonTennis = loadImage("./balones/tennis.png");
  imagenBalonGolf = loadImage("./balones/golf.png");
  imagenBalonBolos = loadImage("./balones/bowling.png");
  imagenGameOver = loadImage("./imagenes-adicionales/gameover.png");
 /* imagen0 = loadImage("./imagenes-adicionales/0.png");
  imagen1 = loadImage("./imagenes-adicionales/1.png");
  imagen2 = loadImage("./imagenes-adicionales/2.png");
  imagen3 = loadImage("./imagenes-adicionales/3.png");
  imagen4 = loadImage("./imagenes-adicionales/4.png");
  imagen5 = loadImage("./imagenes-adicionales/5.png");
  imagen6 = loadImage("./imagenes-adicionales/6.png");
  imagen7 = loadImage("./imagenes-adicionales/7.png");
  imagen8 = loadImage("./imagenes-adicionales/8.png");
  imagen9 = loadImage("./imagenes-adicionales/9.png");*/
  for (let i = 0; i <= 9; i++) {
    numeros.push(loadImage('./numeros/' + i + '.png'));
  }
}

function setup() {
  createCanvas(1200, 600);
  balon = new Balon();
  tiempoInicio = millis(); // Guarda el tiempo actual
  tiempoRestante = duracionNivel; // Inicializa el tiempo restante al valor inicial

  }


function draw() {
  background(220);
  balon.draw();
  balon.move();

  if (balon.checkCollision(obstaculos)) {
    // Si hay colisión, mostrar mensaje de Game Over y reiniciar el juego después de 3 segundos
    image (imagenGameOver, 200, 100, 800, 300);

    setTimeout(function() {
      obstaculos = []; // Reiniciar lista de obstáculos
      balon = new Balon(); // Reiniciar balón
    }, 3000); // Esperar 3 segundos (3000 milisegundos) antes de reiniciar
    return; // Salir de la función draw() para evitar que se siga dibujando
  }


  if (frameCount % 60 === 0) {
    obstaculos.push(new Obstaculo(imagenBalonFutbol, obstaculos)); // Crear un nuevo obstáculo y pasar la imagen y la lista de obstáculos
  }

  // Actualizar y dibujar los obstáculos existentes
  for (let i = obstaculos.length - 1; i >= 0; i--) {
    obstaculos[i].update();
    obstaculos[i].draw();

    // Eliminar los obstáculos que salen del canvas
    if (obstaculos[i].y > height + obstaculos[i].imagenBalonFutbol.height) {
      obstaculos.splice(i, 1);
    }
  }
  tiempoRestante = duracionNivel - (millis() - tiempoInicio); // Calcula el tiempo restante
  
  if (tiempoRestante <= 0 && !nivelPasado) {
    nivelPasado = true;
    nivel++; // Aumenta el nivel
    
    // Reiniciar el juego para el siguiente nivel
    obstaculos = [];
    balon = new Balon();
    tiempoInicio = millis(); // Reiniciar el tiempo
    
    // Establecer el tiempo del siguiente nivel (si es diferente)
    duracionNivel = 30 * 1000; // Por ejemplo, 30 segundos nuevamente
    
    // Otros cambios que quieras realizar al pasar de nivel
    // ...
  }
  
  let segundos = floor(tiempoRestante / 1000);
  let unidades = segundos % 10;
  let decenas = floor(segundos / 10);
  
  image(numeros[decenas], 20, 40); // Dibuja la imagen de las decenas
  image(numeros[unidades], 60, 40); // Dibuja la imagen de las unidades
}
