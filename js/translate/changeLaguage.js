//selector 
const option = document.querySelector("#languageSelector");
const es = document.getElementById("esVal");
const en = document.getElementById("enVal");

const alt = document.querySelector("#idiomaStatus")


//evento 
option.addEventListener('change',()=> {
  if(en.selected){
    localStorage.setItem("Languaje","Ingles");
    alt.textContent = "en"
    cambiarIdiomaIngles()
  }
  if(es.selected){
    cambiarIdiomaEspañol()
    alt.textContent = "es";
    localStorage.setItem("Languaje","Español");
  }
  });

window.addEventListener("DOMContentLoaded",()=>{
  const idiomaLocal = localStorage.getItem("Languaje");
   if(idiomaLocal == "Español"){
    alt.textContent = "es";
     cambiarIdiomaEspañol();
  }
  if(idiomaLocal == "Ingles"){
    alt.textContent = "en"
    cambiarIdiomaIngles();
  }
 })

 //fuctions

function cambiarIdiomaEspañol(){
   
    document.querySelector("title").textContent ="Tienda riwi";
    //Header Change
    document.querySelector(".link1Home").textContent = "Casa";
    document.querySelector(".link1Shop").textContent = "Tienda";
    document.querySelector(".link1about").textContent = "Acerca";
    document.querySelector(".link1acontact").textContent = "Contacto";

    //landing page
    document.querySelector(".info-mS-SHOP h2").textContent ="nuevo aparte";
    document.querySelector(".info-mS-SHOP h1").textContent ="Descubre nuestra Nueva Colección";
    document.querySelector(".BTN-RED-SHOP").textContent ="Compra ahora";
    document.querySelector(".link-more").textContent = "Ver todo";
    document.querySelector(".toy").textContent = "juguetes";
    document.querySelector(".cloch").textContent = "Ropa";
    document.querySelector(".term").textContent = "Termos";
    document.querySelector(".keyn").textContent = "LLaveros";
    document.querySelector(".titu h1").textContent = "Otros Productos";
    document.querySelector("#Btmore").textContent = "Mostrar mas";
    document.querySelector(".logan-text h2").textContent = "50+ Mejores productos de riwi";
    document.querySelector(".classBuv3").textContent = "Explorar mas";
    document.querySelector(".info-section h2").textContent = "#Cambia tu Mundo";
    document.querySelector(".info-section p").textContent = "Ayúdanos y echa una mano a un programador";



    //all selector

}

function cambiarIdiomaIngles(){
    
    document.querySelector("title").textContent ="shop riwi";
     //Header Change
     document.querySelector(".link1Home").textContent = "Home";
     document.querySelector(".link1Shop").textContent = "Shop";
     document.querySelector(".link1about").textContent = "About";
     document.querySelector(".link1acontact").textContent = "Contacto";
        //all selector
    document.querySelector(".info-mS-SHOP h2").textContent ="new Arribal";
    document.querySelector(".info-mS-SHOP h1").textContent ="Discover Our New Collection";
    document.querySelector(".BTN-RED-SHOP").textContent ="buy now";
    document.querySelector(".link-more").textContent = "View all";
    document.querySelector(".toy").textContent = "Toys";
    document.querySelector(".cloch").textContent = "Cloch";
    document.querySelector(".term").textContent = "Terms";
    document.querySelector(".keyn").textContent = "Keychands";
    document.querySelector(".titu h1").textContent = "Our Products";






}