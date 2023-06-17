const apiKey = '27bce82387e946e39fb3dc430f8c590d';
const baseUrl = 'https://api.rawg.io/api';
const juegosAMostrar = 40;

let carrito = [];

function obtenerJuegosLocalStorage() {
  const juegosLocalStorage = localStorage.getItem('juegos');
  return juegosLocalStorage ? JSON.parse(juegosLocalStorage) : [];
}

function almacenarJuegosLocalStorage(juegos) {
  localStorage.setItem('juegos', JSON.stringify(juegos));
}

function obtenerCarritoLocalStorage() {
  const carritoLocalStorage = localStorage.getItem('carrito');
  return carritoLocalStorage ? JSON.parse(carritoLocalStorage) : [];
}

function almacenarCarritoLocalStorage(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function renderizarCards(juegos, cantidadMostrada) {
  const cardsContainer = document.querySelector('.cards-container');

  juegos.slice(0, cantidadMostrada).forEach(juego => {
    const card = document.createElement('div');
    card.classList.add('cardOfer');

    const imagen = document.createElement('img');
    imagen.src = juego.background_image;
    imagen.alt = juego.name;

    const titulo = document.createElement('h3');
    titulo.textContent = juego.name;

    const año = document.createElement('p');
    año.textContent = `Año: ${juego.released}`;

    const precio = document.createElement('p');
    precio.textContent = `Precio: $ 299.99`;

    const botonCarrito = document.createElement('button');
    botonCarrito.textContent = 'Añadir al carrito';
    botonCarrito.addEventListener('click', () => {
      agregarAlCarrito(juego);
    });

    card.appendChild(imagen);
    card.appendChild(titulo);
    card.appendChild(año);
    card.appendChild(precio);
    card.appendChild(botonCarrito);

    cardsContainer.appendChild(card);
  });
}

const botonVerMas = document.querySelector('#ver-mas');
const botonLimpiarResultado = document.querySelector('#ver-menos');
let cantidadMostrada = 5;

botonVerMas.addEventListener('click', () => {
  cantidadMostrada += 5;
  mostrarCards();
});

function mostrarCards() {
  const juegos = obtenerJuegosLocalStorage();
  const cardsContainer = document.querySelector('.cards-container');

  cardsContainer.innerHTML = '';
  renderizarCards(juegos, cantidadMostrada);

  if (cantidadMostrada >= juegos.length) {
    botonVerMas.style.display = 'none';
    botonLimpiarResultado.style.display = 'flex';
  }
}

botonLimpiarResultado.addEventListener('click', () => {
  cantidadMostrada = 5;
  mostrarCards();
});

function agregarAlCarrito(juego) {
  const juegoExistente = carrito.find(item => item.id === juego.id);

  if (juegoExistente) {
    juegoExistente.cantidad += 1;
  } else {
    carrito.push({ ...juego, cantidad: 1 });
  }

  renderizarCarrito();
  mostrarModal('Tu juego se agregó correctamente');

  console.log('¡Juego agregado al carrito!', juego.name);
}

function renderizarCarrito() {
  const cartContainer = document.querySelector('#cart-container');
  cartContainer.innerHTML = '';

  if (carrito.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'El carrito está vacío.';
    cartContainer.appendChild(emptyMessage);
    return;
  }

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

  almacenarCarritoLocalStorage(carrito);
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
  }, 3000);
}

function obtenerJuegosAleatorios(juegos, cantidad) {
  const juegosAleatorios = [];
  const indicesUtilizados = [];

  while (juegosAleatorios.length < cantidad) {
    const indiceAleatorio = Math.floor(Math.random() * juegos.length);

    if (!indicesUtilizados.includes(indiceAleatorio)) {
      juegosAleatorios.push(juegos[indiceAleatorio]);
      indicesUtilizados.push(indiceAleatorio);
    }
  }

  return juegosAleatorios;
}

function renderizarJuegosAleatorios(juegos) {
  const lastGamesContainer = document.querySelector('.last-games');
  lastGamesContainer.innerHTML = '';

  const juegosAleatorios = obtenerJuegosAleatorios(juegos, 10);

  juegosAleatorios.forEach(juego => {
    const minCard = document.createElement('div');
    minCard.classList.add('minCard');

    const imagen = document.createElement('img');
    imagen.src = juego.background_image;
    imagen.alt = juego.name;

    const titulo = document.createElement('h3');
    titulo.textContent = juego.name;

    const año = document.createElement('p');
    año.textContent = `Año: ${juego.released}`;

    const precio = document.createElement('p');
    precio.textContent = `Precio: $ 299.99`;

    const botonCarrito = document.createElement('button');
    botonCarrito.textContent = '+';
    botonCarrito.addEventListener('click', () => {
      agregarAlCarrito(juego);
    });

    minCard.appendChild(imagen);
    minCard.appendChild(titulo);
    minCard.appendChild(año);
    minCard.appendChild(precio);
    minCard.appendChild(botonCarrito);

    lastGamesContainer.appendChild(minCard);
  });
}

function cargarJuegos() {
  fetch(`${baseUrl}/games?key=${apiKey}&page_size=${juegosAMostrar}`)
    .then(response => response.json())
    .then(data => {
      const juegos = data.results;
      almacenarJuegosLocalStorage(juegos);
      mostrarCards();
      renderizarJuegosAleatorios(juegos);
    })
    .catch(error => {
      console.log('Error al cargar los juegos:', error);
    });
}

function inicializar() {
  carrito = obtenerCarritoLocalStorage();
  cargarJuegos();
  renderizarCarrito();
}

inicializar();
