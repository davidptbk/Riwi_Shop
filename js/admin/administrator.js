//Imports
import { cleanInformation } from "../utilities/DOM_utility.js";
import { captureData, infoModalCategory, infoModalProduct, infoModalUser } from "../admin/adminFunctions.js";
import { get, post, deleteHttp } from "../utilities/API/functions.js";
import {URL_Products} from "../utilities/API/URLs.js";

//Selectors
const menuOption = document.querySelector(".links");
const information = document.querySelector(".information");
const containerModal = document.querySelector(".container-modal");
const cajamodal = document.querySelector(".set")

//caja Completa del modal
const modalactivate = document.querySelector(".OpenModal");

//General Events
document.addEventListener("DOMContentLoaded", function () {
  const view = localStorage.getItem("view");
  if (!view){
    console.log("HOla"); //Duda para kevin: ¿Como puedo llamar el html base?
  }
  if (view == "category"){
    categoryManager();
  }
  if (view == "product"){
    productManager();
  }
});

information.addEventListener('click',(event)=>{

  const verified = event.target.classList.contains('OpenModal');
  if (verified == true) {
    cajamodal.style.display = "flex";
   }else{
     cajamodal.style.display = "none";
   }
  })

  containerModal.addEventListener('click',(event)=>{

    const verified = event.target.classList.contains('BynClose');
    if (verified == true) {
        cajamodal.style.display = "none";
     }
    })


information.addEventListener("click", (e) => {
  e.preventDefault();

  //Function to display the categories option
  if (e.target.getAttribute("id") == "categories") {
    categoryManager();
  }

  //Function to display the products option
  if (e.target.getAttribute("id") == "products") {
    productManager();
  }

  //Function displaying the registered users
  if (e.target.getAttribute("id") == "users") {
    userManager();
  }

  //Function for displaying sales statistics
  if (e.target.getAttribute("id") == "sales") {
      salesManager();
  }
  
});

menuOption.addEventListener("click", (e) => {
  e.preventDefault();

  //Funcion para volver al LandingPage
  if (e.target.classList.contains("back")) {
    backHome();
  }

  //Function to display the categories option
  if (e.target.classList.contains("categories")) {
    categoryManager();
  }

  //Function to display the products option
  if (e.target.classList.contains("products")) {
    productManager();
  }

  //Function displaying the registered users
  if (e.target.classList.contains("users")) {
    userManager();
  }

  //Function for displaying sales statistics
  if (e.target.classList.contains("sales")) {
    salesManager();
  }

  //Logout function
  if (e.target.classList.contains("singOut")) {
    signOut();
  }
});

//Functions
/** 
 Organiza la informacion de las categorias existentes en una tabla, con botones de accion como editar y eliminar
*/
function categoryManager(){
  localStorage.setItem("view", "category")
  cleanInformation(information);

  information.innerHTML = `
  <div class = "botonsTable">
  
    <button id = "addCategory"  class="OpenModal"> Add Category</button>
    <button id = "searchCategory" class="OpenModal"> Search Category</button>

  </div>

  <table class = "CategorieTable" border ="1"> 

  <tr class = "InfoTableCategories">
      <th>Actions</th>
      <th>ID</th>
      <th>Name Category</th>
      <th>Details</th>
      <th></th>
  </tr>
  
  <tr class="DataTableCategories">
      <th class="ActionsTable">
          <button>edit</button>
          <button class="DAngerBut">delete</button>
      </th>
      
      <th>1</th>
      <th>123456</th>
      <th>Jose</th>
      
      <th> <a href="#">see more ></a></th>

  </tr>

  <tr class="DataTableCategories">
      <th class="ActionsTable">
          <button>edit</button>
          <button class="DAngerBut">delete</button>
      </th>
      
      <th>2</th>
      <th>Peluches</th>
      <th>Los peluches</th>
      
      <th> <a href="#">see more ></a></th>

  </tr>

</table>
    `;

  infoModalProduct(containerModal);
}
/** 
 Organiza la informacion de los productos existentes en una tabla, con botones de accion como editar y eliminar
*/
async function productManager() {
  cleanInformation(information);
  localStorage.setItem("view", "product")
  information.innerHTML = `
  <div class = "botonsTable">
  
    <button id = "addProducts" class="OpenModal"> Add Products</button>
    <button id = "searchProducts" class="OpenModal"> Search Products</button>

  </div>

  <table class = "CategorieTable" border ="1" >

  <tr class = "InfoTableCategories">
      <th>Actions</th>
      <th>ID</th>
      <th>Product Name </th>
      <th>Category</th>
      <th>Price</th>
      <th>Model</th>
      <th>Details</th>
  </tr>
  `

  const products = await get(URL_Products);
  console.log(products);
  products.forEach(product => {
    information.querySelector("table").innerHTML += `
    <tr class="DataTableCategories">
        <th class="ActionsTable">
            <button class= "edit">edit</button>
            <button class= "delete">delete</button>
        </th>

        <th>${product.id}</th>
        <th>${product.title}</th>
        <th>${product.description}</th>
        <th>${product.price}</th>
        <th>${product.model}</th>
        <th> <a href="#">see more ></a></th>
    </tr>

    </table>
      `;
    });
  
    infoModalProduct(containerModal);
    const modalForm = containerModal.querySelector("form")
    
    modalForm.addEventListener("submit", (e) =>{
      e.preventDefault();
      postProduct();
    });

    const actions = document.querySelector("table");

    actions.addEventListener("click", event =>{
      event.preventDefault();
      if(event.target.classList.contains("edit"))
        console.log(getId(event));
      
      if(event.target.classList.contains("delete")){
        deleteHttp(`${URL_Products}/${getId(event)}`);
        productManager();
      }

    });
}

function userManager() {
  cleanInformation(information);
  localStorage.setItem("view", "user")
  information.innerHTML = `
  <div class = "botonsTable">
  
    <button id = "addUser" class="OpenModal"> Add Users</button>
    <button id = "searchUser" class="OpenModal"> Search Users</button>

  </div>

  <table class = "CategorieTable" border ="1" >
    <tr  class = "InfoTableCategories">
        <th>Actions</th>
        <th>ID</th>
        <th>Document</th>
        <th>Names</th>
        <th>Lastnames</th>
        <th>Details</th>
    </tr>
    <tr class="DataTableCategories">
        <th class="ActionsTable">
            <button>edit</button>
            <button class="DAngerBut">delete</button>
        </th>

        <th>1</th>
        <th>123456</th>
        <th>Jose</th>
        <th>Perez</th>
        <th> <a href="#">see more ></a></th>
    </tr>

  </table>
    `;

    infoModalUser(proofModal);
}

//Aun no se saben los campos de Sales
function salesManager() {
  cleanInformation(information);

  information.innerHTML = `
  <div class = "botonsTable">
  
    <button id = "addSales" class="OpenModal"> Add Sales</button>
    <button id = "searchSales" class="OpenModal"> Search Sales </button>

  </div>

  <table class = "CategorieTable" border ="1" >
  <tr class = "InfoTableCategories">
      <th>Actions</th>
      <th>ID</th>
      <th>Document</th>
      <th>Names</th>
      <th>Lastnames</th>
      <th>Details</th>
  </tr>
  <tr class="DataTableCategories">
      <th class="ActionsTable">
          <button>edit</button>
          <button>delete</button>
      </th>

      <th>1</th>
      <th>123456</th>
      <th>Jose</th>
      <th>Perez</th>
      <th> <a href="#">see more ></a></th>
  </tr>

</table>
    `;
}

function backHome() {
  localStorage.removeItem("view");
  window.location.href = "../../LandingPage.html";
}

function backcarrito() {
  window.location.href = "shoppingCar.html";
}

function signOut(){
  localStorage.removeItem("user");
  backHome()
}

function btnEdit(btn){

}
/**
 * @param {string} event- Reconoce el elemento a donde se le dio click en ese momento 
 * @returns Retorna el id obtenido en la tabla 
 */
function getId(event){
  return event.target.parentElement.parentElement.querySelectorAll("th")[1].textContent;
}

function getData(URL, id) {
  return get(`${URL}/${id}`);
}
/**
 * Guarda/Actualiza el producto que esta en el modal de informacion de un producto
 */
function postProduct(){
  const inputProducts = containerModal.querySelectorAll("input");
  const newData = captureData(inputProducts)
  const newProduct = {
    "title": newData.title ,
    "description": newData.description,
    "images": newData.images,
    "dealer": newData.dealer,
    "price": newData.price,
    "model": newData.model,
    "categoryid": newData.categoryid,
    "features": {}
  }

  //post(URL_Products,newProduct)

}