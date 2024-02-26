//Slider de landing page 

//Seleccionador
const slides = document.querySelector('.slides');
const dotsContainer = document.querySelector('.dots');
const totalSlides = document.querySelectorAll('.slide').length;
let currentSlide = 0;

//selector Categories
const circuleMeta = document.querySelector(".ct-1");





// Crear puntos dinámicamente
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dotsContainer.appendChild(dot);
    dot.addEventListener('click', () => {
        goToSlide(i);
    });
}

// Agregar clase 'active' al primer punto
const dots = document.querySelectorAll('.dot');
dots[currentSlide].classList.add('active');

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function updateSlider() {
    slides.style.transform = `translateX(${-currentSlide * 100}%)`;

    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentSlide) {
            dot.classList.add('active');
        }
    });
}

window.nextSlide = function() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}
setInterval(nextSlide, 5000);

window.prevSlide = function() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}
//Selectores
const buyboton = document.querySelector(".boton-buy");
const containerOurProducts = document.querySelector('.productos-contains');

//Eventos
containerOurProducts.addEventListener('click', e => {
    e.preventDefault();
    if (e.target.classList.contains('opciones')){
        redireccionar();
    }

});

// buyboton.addEventListener('click',e =>{
//     e.preventDefault();
//     chekaut();
// })


//Funciones

function redireccionar() {
    var enlaces = [
        "../../redirects/shopRiwi/pageProductoSelect.html",
        "../../redirects/shopRiwi/pageProductoSelect.html"
    ];

    for (var i = 0; i < enlaces.length; i++) {
        window.location.href = enlaces[i];
        if (window.location.href === enlaces[i]) {
            break;
        }
    }

}

function chekaut(){
    window.location.href = "e-comerse/redirects/chekout.html";
}


//event categories 
circuleMeta.addEventListener("click",(event)=>{

    console.log(event.target)
})