//Menú de navegacion aca debajo (NO TOQUES NADA! MENU OK!)
const toggleButton = document.getElementById('button-menu');
const navWrapper = document.getElementById('nav-list');
const closeMenu = document.getElementById('button-menu');

toggleButton.addEventListener('click', () => {
  navWrapper.classList.toggle('show');
  navWrapper.classList.toggle('close');
  
  if (navWrapper.classList.contains('show')) {
    navWrapper.classList.add('close');
    closeMenu.innerHTML = '<i class="fa-solid fa-xmark"></i>Cerrar</button>';
  } else {
    navWrapper.classList.remove('close');
    toggleButton.innerHTML = '<i class="fa-solid fa-bars"></i>Menú</button>';
  }
});

document.addEventListener('click', (e) => {
  const target = e.target;

  if (!navWrapper.contains(target) && target !== toggleButton) {
    navWrapper.classList.remove('show');
    navWrapper.classList.add('close');
    closeMenu.innerHTML = '<i class="fa-solid fa-bars"></i>Menú</button>';
  }
});

navWrapper.addEventListener('click', (e) => {
  if (e.target.nodeName == 'A') {
    navWrapper.classList.remove('show');
    navWrapper.classList.add('close');
    closeMenu.innerHTML = '<i class="fa-solid fa-bars"></i>Menú</button>';
  }
});


//------------------------FIN MENU--♪♪♫♫

const aboutUsContet = document.querySelector('#aboutUs-txt');
const txtAboutUs = document.createElement('p');
txtAboutUs.textContent = "Nosotros en StarGames somos un equipo apasionado de profesionales de la industria de los videojuegos. Nuestra dedicación y experiencia nos han llevado a crear una plataforma que busca brindar la mejor experiencia de juego a todos nuestros usuarios.Nos enorgullece ofrecer una amplia gama de juegos de alta calidad, cuidadosamente seleccionados para satisfacer los gustos y preferencias de jugadores de todas las edades y niveles de habilidad. Desde juegos clásicos que evocan nostalgia hasta las últimas innovaciones en la industria, trabajamos arduamente para mantener nuestro catálogo actualizado y relevante."
aboutUsContet.appendChild(txtAboutUs).className ='aboutUs-txt';

const heroContent = document.querySelector('.hero-txt-container');
const txtHero = document.createElement('p');
txtHero.textContent = "¡Bienvenidos a StarGames, el paraíso de los juegos digitales!¡Prepárate para horas interminables de diversión y entretenimiento en StarGames, donde los mejores juegos digitales te esperan! ¡Únete a nosotros y descubre el paraíso de los juegos digitales!"
heroContent.appendChild(txtHero).className ='hero-main-txt';

/* Slider */
const slider = document.querySelector(".slider");
const slides = slider.querySelector(".slides");
const prevBtn = slider.querySelector(".prev");
const nextBtn = slider.querySelector(".next");

const slideWith = slides.clientWidth;
console.log(slideWith)
let slideIndex = 0;

const moveToSlide = () => {
    slides.style.transform = `translateX(${-slideWith * slideIndex}px)`;
};

const nextSlide = () => {
    if (slideIndex === slides.children.length - 1) {
        slideIndex = 0;
    } else {
        slideIndex++;
    }
    moveToSlide();
};
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", () => {
    console.log(slideIndex, "prev")
    if (slideIndex === 0) {
        return false;
    };
    slideIndex--;
    moveToSlide();
});
const autoPlayInterval = setInterval(() => {
    nextSlide();
}, 3500);

slider.addEventListener('mouseover', function () {
    clearInterval(autoPlayInterval);
})

/*  */
/* formulario de contacto */
document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault(); 

  let email = document.getElementById('email-input').value;
  let name = document.getElementById('name-input').value;
  let phone = document.getElementById('phone-input').value;
  let message = document.getElementById('message-input').value;

  
  document.getElementById('email-input').value = '';
  document.getElementById('name-input').value = '';
  document.getElementById('phone-input').value = '';
  document.getElementById('message-input').value = '';

  
  alert('¡Formulario enviado con éxito!');
});