function moverBase() {
  imagenBaseX += 5;
  if (imagenBaseX < -imagenBase.width) {
      imagenBaseX = 0;
  }

  image(imagenBase, imagenBaseX, 580);
// image(imagenBase, imagenBaseX + imagenBase.width, 580);
}