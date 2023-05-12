async function clickAnimal(animal) {
  var elemento = document.getElementsByClassName(
    "cont-titulo-animal-seleccionado"
  );
  var tituloAnimal = document.getElementsByClassName(
    "titulo-animal-seleccionado"
  );
  
  var tarjeta = document.getElementsByClassName("contenedor-card");
  //visualizar card
  tarjeta[0].style.display = "flex";

  //limpiar el titulo
  if (tituloAnimal[0]) tituloAnimal[0].remove();

  //Agrego el titulo del animal seleccionado
  elemento[0].insertAdjacentHTML(
    "beforebegin",
    "<h1 class='titulo-animal-seleccionado'>" + animal.toUpperCase() + "</h1>"
  );

  //Cambiar la imagen
  var elemento = document.getElementsByClassName("imagen-animal-seleccionado");
  elemento[0].src = "src/imagen/" + animal + ".png";

  //Abre el modal
  window.location.href = "#modal";

  //Crea el elemento para la voz
  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(animal);
  utterThis.rate = "0.5";

  ejecutarSonido(utterThis, synth, animal);
}

const cargarSonido = function (fuente) {
  const sonido = document.createElement("audio");
  sonido.src = fuente;
  sonido.setAttribute("preload", "auto");
  sonido.setAttribute("controls", "none");
  sonido.style.display = "none"; // <-- oculto
  document.body.appendChild(sonido);
  return sonido;
};

async function ejecutarSonido(utterThis, synth, animal){
  // Promesa para decir el animal y despues ejecutar el sonido
  await new Promise(function (resolve) {
    utterThis.onend = resolve;
    synth.speak(utterThis);
  }).then(() => {
    const sonido = cargarSonido("src/sonidos/" + animal + ".mp3");
    sonido.play();
    setTimeout(() => {
      sonido.pause();
      cerrarModal();
    }, "2500");
  });
}

function cerrarModal() {
  window.location.href = "#close";
}
