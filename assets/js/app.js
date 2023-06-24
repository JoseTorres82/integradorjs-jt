const apiKey = '27bce82387e946e39fb3dc430f8c590d';
const baseUrl = 'https://api.rawg.io/api';
const juegosAMostrar = 4;
const cantidadMostrada = 5;

let carrito = [];

function almacenarCarritoLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function obtenerCarritoLocalStorage() {
  const carritoString = localStorage.getItem('carrito');
  return JSON.parse(carritoString) || [];
}

function agregarAlCarrito(juego) {
  const juegoExistente = carrito.find(item => item.id === juego.id);

  if (juegoExistente) {
    juegoExistente.cantidad += 1;
  } else {
    juego.cantidad = 1;
    carrito.push(juego);
  }

  mostrarModal(`${juego.name} se añadió al carrito`);
  renderizarCarrito();
}

function renderizarCarrito() {
  const cartContainer = document.querySelector('#cart-container');
  cartContainer.innerHTML = '';

  carrito.forEach(juego => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    const imagen = document.createElement('img');
    imagen.src = juego.background_image;
    imagen.alt = juego.name;

    const titulo = document.createElement('h4');
    titulo.textContent = juego.name;

    const cantidadContainer = document.createElement('div');
    cantidadContainer.classList.add('cantidad-container');

    const decrementButton = document.createElement('button');
    decrementButton.textContent = '-';
    decrementButton.addEventListener('click', () => {
      disminuirCantidad(juego);
    });

    const cantidad = document.createElement('p');
    cantidad.textContent = juego.cantidad;

    const incrementButton = document.createElement('button');
    incrementButton.textContent = '+';
    incrementButton.addEventListener('click', () => {
      aumentarCantidad(juego);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', () => {
      eliminarJuegoCarrito(juego);
    });

    cantidadContainer.appendChild(decrementButton);
    cantidadContainer.appendChild(cantidad);
    cantidadContainer.appendChild(incrementButton);

    cartItem.appendChild(imagen);
    cartItem.appendChild(titulo);
    cartItem.appendChild(cantidadContainer);
    cartItem.appendChild(deleteButton);

    cartContainer.appendChild(cartItem);
  });

  almacenarCarritoLocalStorage();
}

function disminuirCantidad(juego) {
  const juegoExistente = carrito.find(item => item.id === juego.id);

  if (juegoExistente) {
    if (juegoExistente.cantidad > 1) {
      juegoExistente.cantidad -= 1;
      renderizarCarrito();
    } else {
      eliminarJuegoCarrito(juego);
    }
  }
}

function aumentarCantidad(juego) {
  const juegoExistente = carrito.find(item => item.id === juego.id);

  if (juegoExistente) {
    juegoExistente.cantidad += 1;
    renderizarCarrito();
  }
}

function eliminarJuegoCarrito(juego) {
  const index = carrito.findIndex(item => item.id === juego.id);

  if (index !== -1) {
    carrito.splice(index, 1);
    renderizarCarrito();
  }
}

function mostrarModal(mensaje) {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.textContent = mensaje;
  document.body.appendChild(modal);

  setTimeout(() => {
    modal.remove();
  }, 2000);
}

async function obtenerJuegosLocalStorage() {
  const juegosString = localStorage.getItem('juegos');

  if (juegosString) {
    return JSON.parse(juegosString);
  }

  return [];
}

function almacenarJuegosLocalStorage(juegos) {
  localStorage.setItem('juegos', JSON.stringify(juegos));
}

async function renderizarJuegosAleatorios(juegos) {
  const lastGamesContainer = document.querySelector('.last-games');
  lastGamesContainer.innerHTML = '';

  juegos.forEach(juego => {
    const minCard = document.createElement('div');
    minCard.classList.add('minCard');

    const imagen = document.createElement('img');
    imagen.src = juego.background_image;
    imagen.alt = juego.name;

    const titulo = document.createElement('h4');
    titulo.textContent = juego.name;

    const año = document.createElement('p');
    año.textContent = `Año de lanzamiento: ${juego.released}`;

    const genero = document.createElement('p');
    genero.textContent = `Género: ${juego.genres.map(g => g.name).join(', ')}`;

    const precio = document.createElement('p');
    precio.textContent = `Precio: $299.99`;

    const botonCarrito = document.createElement('button');
    botonCarrito.textContent = 'Añadir al carrito';
    botonCarrito.addEventListener('click', () => {
      agregarAlCarrito(juego);
    });

    minCard.appendChild(imagen);
    minCard.appendChild(titulo);
    minCard.appendChild(año);
    minCard.appendChild(genero);
    minCard.appendChild(precio);
    minCard.appendChild(botonCarrito);

    lastGamesContainer.appendChild(minCard);
  });
}

async function obtenerJuegosAleatorios() {
  const url = `${baseUrl}/games?key=${apiKey}&page_size=${juegosAMostrar}`;
  const respuesta = await fetch(url);
  const data = await respuesta.json();

  return data.results;
}

async function obtenerJuegosPopulares() {
  const url = `${baseUrl}/games?key=${apiKey}&ordering=-rating&page_size=${cantidadMostrada}`;
  const respuesta = await fetch(url);
  const data = await respuesta.json();

  return data.results;
}

/* async function renderizarCards(juegos) {
  const ofertasContainer = document.querySelector('.cards-container');
  ofertasContainer.innerHTML = '';

  juegos.forEach(juego => {
    const cardOfer = document.createElement('div');
    cardOfer.classList.add('cardOfer');

    const imagen = document.createElement('img');
    imagen.src = juego.background_image;
    imagen.alt = juego.name;

    const titulo = document.createElement('h4');
    titulo.textContent = juego.name;

    const genero = document.createElement('p');
    genero.textContent = `Género: ${juego.genres.map(g => g.name).join(', ')}`;

    const precio = document.createElement('p');
    precio.textContent = `Precio: $299.99`;

    const botonCarrito = document.createElement('button');
    botonCarrito.textContent = 'Añadir al carrito';
    botonCarrito.addEventListener('click', () => {
      agregarAlCarrito(juego);
    });

    cardOfer.appendChild(imagen);
    cardOfer.appendChild(titulo);
    cardOfer.appendChild(genero);
    cardOfer.appendChild(precio);
    cardOfer.appendChild(botonCarrito);

    ofertasContainer.appendChild(cardOfer);
  });
} */
async function renderizarCards(juegos) {
  const ofertasContainer = document.querySelector('.cards-container');
  ofertasContainer.innerHTML = '';

  juegos.forEach(juego => {
    const cardOfer = document.createElement('div');
    cardOfer.classList.add('cardOfer');

    const imagen = document.createElement('img');
    imagen.src = juego.background_image;
    imagen.alt = juego.name;

    const cardOferText = document.createElement('div');
    cardOferText.classList.add('cardOferText');

    const titulo = document.createElement('h4');
    titulo.textContent = juego.name;

    const genero = document.createElement('p');
    genero.textContent = `Género: ${juego.genres.map(g => g.name).join(', ')}`;

    const precio = document.createElement('p');
    precio.textContent = `Precio: $299.99`;

    const botonContainer = document.createElement('div');
    botonContainer.classList.add('alinearBoton');

    const botonCarrito = document.createElement('button');
    botonCarrito.textContent = 'Añadir al carrito';
    botonCarrito.addEventListener('click', () => {
      agregarAlCarrito(juego);
    });

    botonContainer.appendChild(botonCarrito);

    cardOferText.appendChild(titulo);
    cardOferText.appendChild(genero);
    cardOferText.appendChild(precio);

    cardOfer.appendChild(imagen);
    cardOfer.appendChild(cardOferText);
    cardOfer.appendChild(botonContainer);

    ofertasContainer.appendChild(cardOfer);
  });
}

async function inicializar() {
  carrito = obtenerCarritoLocalStorage();
  renderizarCarrito();

  const juegosLocalStorage = await obtenerJuegosLocalStorage();

  if (juegosLocalStorage.length > 0) {
    renderizarJuegosAleatorios(juegosLocalStorage);
  } else {
    const juegosAleatorios = await obtenerJuegosAleatorios();
    almacenarJuegosLocalStorage(juegosAleatorios);
    renderizarJuegosAleatorios(juegosAleatorios);
  }

  const juegosPopulares = await obtenerJuegosPopulares();
  renderizarCards(juegosPopulares);
}

window.addEventListener('DOMContentLoaded', inicializar);

async function renderizarJuegosPorGenero(genero) {
  const url = `${baseUrl}/games?key=${apiKey}&genres=${genero}&page_size=${juegosAMostrar}`;
  const respuesta = await fetch(url);
  const data = await respuesta.json();
  const juegos = data.results;
  renderizarCards(juegos);
}

async function renderizarJuegosDeTodosLosGeneros() {
  const generos = ["action", "adventure", "role-playing-games-rpg", "strategy", "sports"];
  const juegosPorGenero = [];

  for (let i = 0; i < generos.length; i++) {
    const url = `${baseUrl}/games?key=${apiKey}&genres=${generos[i]}&page_size=5`;
    const respuesta = await fetch(url);
    const data = await respuesta.json();
    const juegos = data.results;
    juegosPorGenero.push(...juegos);
  }

  renderizarCards(juegosPorGenero);
}

function limpiarFiltros() {
  const cardsContainer = document.querySelector('.cards-container');
  cardsContainer.innerHTML = '';

  const juegosPopulares = obtenerJuegosPopulares();
  renderizarCards(juegosPopulares);
}


function inicializarBotonesFiltros() {
  const filtersContainer = document.createElement('div');
  filtersContainer.classList.add('filters-btn');

  const generos = ["action", "adventure", "role-playing-games-rpg", "strategy", "sports"];

  generos.forEach(genero => {
    const botonGenero = document.createElement('button');
    botonGenero.textContent = genero;
    botonGenero.addEventListener('click', () => {
      renderizarJuegosPorGenero(genero);
    });

    filtersContainer.appendChild(botonGenero);
  });

  const botonVerTodas = document.createElement('button');
  botonVerTodas.textContent = 'Ver todas';
  botonVerTodas.addEventListener('click', () => {
    renderizarJuegosDeTodosLosGeneros();
  });

  const botonLimpiarFiltros = document.createElement('button');
  botonLimpiarFiltros.textContent = 'Limpiar filtros';
  botonLimpiarFiltros.addEventListener('click', () => {
    limpiarFiltros();
  });

  filtersContainer.appendChild(botonVerTodas);
  filtersContainer.appendChild(botonLimpiarFiltros);

  const cardsContainer = document.querySelector('.cards-container');
  const parentContainer = cardsContainer.parentNode;
  parentContainer.insertBefore(filtersContainer, cardsContainer);

  const br = document.createElement('br');
  parentContainer.insertBefore(br, cardsContainer);
}

async function inicializar() {
  carrito = obtenerCarritoLocalStorage();
  renderizarCarrito();

  const juegosLocalStorage = await obtenerJuegosLocalStorage();

  if (juegosLocalStorage.length > 0) {
    renderizarJuegosAleatorios(juegosLocalStorage);
  } else {
    const juegosAleatorios = await obtenerJuegosAleatorios();
    almacenarJuegosLocalStorage(juegosAleatorios);
    renderizarJuegosAleatorios(juegosAleatorios);
  }

  const juegosPopulares = await obtenerJuegosPopulares();
  renderizarCards(juegosPopulares);

  inicializarBotonesFiltros();
}

window.addEventListener('DOMContentLoaded', inicializar);
