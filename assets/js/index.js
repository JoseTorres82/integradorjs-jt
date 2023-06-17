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
  navWrapper.addEventListener('click', (e) => {
    if (e.target.nodeName == 'A') {
      navWrapper.classList.remove('show');
      navWrapper.classList.add('close');
      closeMenu.innerHTML = '<i class="fa-solid fa-bars"></i>Menú</button>';
    }
  });
});

//------------------------FIN MENU--♪♪♫♫

const aboutUsContet = document.querySelector('#aboutUs-txt');
const txtAboutUs = document.createElement('p')
txtAboutUs.textContent = "¡Bienvenidos a StarGames, el paraíso de los juegos digitales! Sumérgete en emocionantes aventuras y compite en frenéticas batallas. Descubre los títulos más populares y clásicos. Disfruta de una experiencia de compra excepcional y un soporte al cliente excepcional. ¡Prepárate para horas interminables de diversión y entretenimiento en StarGames, donde los mejores juegos digitales te esperan! ¡Únete a nosotros y descubre el paraíso de los juegos digitales!"
aboutUsContet.appendChild(txtAboutUs).className ='abutUs-txt';





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
