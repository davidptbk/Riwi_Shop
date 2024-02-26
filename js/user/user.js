//Imports
import {cleanInformation} from "../utilities/DOM_utility.js"

//Selectors
const menuOption = document.querySelector(".links");
const information = document.querySelector(".information");

//Eventos
document.addEventListener("DOMContentLoaded", function (){
  information.querySelector(".check").style.display = "none";
});

information.addEventListener("click", (e) => {
  e.preventDefault();
  //Function for edit profile button
  if (e.target.classList.contains("edit")) {
    editProfile();
  }

  //Function to save changes made to the profile
  if (e.target.classList.contains("check")) {
    checkProfile();
  }
});

menuOption.addEventListener("click", (e) => {
  e.preventDefault();
  if(e.target.classList.contains("back")) {
    backHome();  
  }

 if(e.target.classList.contains("carr")) {
    backcarrito();
  }

  //Function to display the profile info letter
  if (e.target.classList.contains("myprofile")) {
    showProfile();
  }

  //Function showing purchases made by the user
  if (e.target.classList.contains("shoping")) {
    showShopping();
  }
  
  //Logout function
  if (e.target.classList.contains("singOut")) {
    localStorage.removeItem("user");
  }
});

//Funciones
function showProfile() {
  cleanInformation(information);

  information.innerHTML = ` 
  <div class = "card-user">
  <div class="left">
      <div class="foto-users">
          <div class="foto">
              <img src="../media/figma/prc.png" alt="Logo" class="img-left">
          </div>
          <label for="name" id ="name-label">Name:</label>
          <input type="text" value="Simon" readonly id="name">
          <label for="last-name" id ="lastname-label">Last Names</label>
          <input type="text" value="Franco" readonly id="last-name">
      </div>

  </div>
  <div class="right">
      <div class="correo">
          <label for="email" class="label-correo">Email</label>
          <input type="text" value="riwiContaus@gmail.com" readonly id="email">
      </div>
      <div class="telefono">
          <label for="phone"  class="label-telefono">Phone</label>
          <input type="text" value="telefono" readonly id="phone">
      </div>
      <div class="genero">
          <label for="gender" class="label-genero">Gender</label>
          <input type="text" value="genero" readonly id="gender">
      </div>
      <div class="direccion">
          <label for="address" class="label-direccion">Address</label>
      <input type="text" value="direccion" readonly id="address">
      </div>
      <i class='bx bxs-edit edit' ><span class="material-symbols-outlined">edit</span></i>
      <i class='bx bx-check check'><span class="material-symbols-outlined" ;">done</span></i>
  </div>
  <div class="aler">
                    
  <div class="image-log">
      <img src="../media/ass-v1/logos/pstñLogo.ico">
  </div>
  <p>Your personal data will be used to support your experience throughout this website, to manage<br> access to your account, and for other purposes described in our privacy policy.</p>

</div>
</div> 
    `;

    // document.getElementById("name-label").style.display = "none";
    // document.getElementById("lastname-label").style.display = "none";
    information.querySelector(".check").style.display = "none";
}

function showShopping() {
  cleanInformation(information);

  information.innerHTML = `
  
  <div class="container-product">


  <div class="card-product-tarjet">
      <div class="image-product">
          <img src="../media/ass-v1/logos/logoRiwiShop.png" alt="">
      </div>
          <div class="producto-info">
              <div class="producto">
                 <h2>Entregando</h2>
                 <p>Llega el 23 de febrero <span class="fastSend"><span class="material-symbols-outlined">bolt</span>Estandar rapido</span></p>
                 <h6>El patito de riwi de goma semielastico chillon<br>Para bañera sin decoloracion</h6>
              </div>
              <div class="info-pago">
                  <p>Empresa Riwi dapB </p>
                  <a href="">Enviar un mensaje</a>
              </div>
              <div class="fechas">
                  <h1>8 de febrero de 2024</h1>
                  <p>Fecha del pedido: <span>10/03/24</span></p>
               
              </div>

          </div>
      <button class="btn-ver-productos">Ver producto</button>
    </div>
  


    <div class="card-product-tarjet">
      <div class="image-product">
          <img src="../media/ass-v1/public/Imagen de WhatsApp 2024-02-03 a las 09.41.04_95607ec0.jpg" alt="">
      </div>
          <div class="producto-info">
              <div class="producto">
                 <h2>Entregando</h2>
                 <p>Llega el 23 de febrero <span class="normalSend"><span class="material-symbols-outlined">local_shipping</span>Normal entrega</span></p>
                 <h6>El patito de riwi de goma semielastico chillon<br>Para bañera sin decoloracion</h6>
              </div>
              <div class="info-pago">
                  <p>Empresa Riwi dapB </p>
                  <a href="">Enviar un mensaje</a>
              </div>
              <div class="fechas">
                  <h1>9 de febrero de 2024</h1>
                  <p>Fecha del pedido: <span>10/02/24</span></p>
               
              </div>

          </div>
      <button class="btn-ver-productos">Ver producto</button>
    </div>
  


    <div class="card-product-tarjet">
      <div class="image-product">
          <img src="../media/ass-v1/logos/logoRiwiShop.png" alt="">
      </div>
          <div class="producto-info">
              <div class="producto">
                 <h2>Entregando</h2>
                 <p>Llega el 23 de febrero <span class="fastSend"><span class="material-symbols-outlined">bolt</span>Estandar rapido</span></p>
                 <h6>El patito de riwi de goma semielastico chillon<br>Para bañera sin decoloracion</h6>
              </div>
              <div class="info-pago">
                  <p>Empresa Riwi dapB </p>
                  <a href="">Enviar un mensaje</a>
              </div>
              <div class="fechas">
                  <h1>8 de febrero de 2024</h1>
                  <p>Fecha del pedido: <span>10/03/24</span></p>
               
              </div>

          </div>
      <button class="btn-ver-productos">Ver producto</button>
    </div>
  
    


    
    <div class="card-product-tarjet">
      <div class="image-product">
          <img src="../media/ass-v1/public/Imagen de WhatsApp 2024-02-03 a las 09.41.04_95607ec0.jpg" alt="">
      </div>
          <div class="producto-info">
              <div class="producto">
                 <h2>Entregando</h2>
                 <p>Llega el 23 de febrero <span class="normalSend"><span class="material-symbols-outlined">local_shipping</span>Normal entrega</span></p>
                 <h6>El patito de riwi de goma semielastico chillon<br>Para bañera sin decoloracion</h6>
              </div>
              <div class="info-pago">
                  <p>Empresa Riwi dapB </p>
                  <a href="">Enviar un mensaje</a>
              </div>
              <div class="fechas">
                  <h1>9 de febrero de 2024</h1>
                  <p>Fecha del pedido: <span>10/02/24</span></p>
               
              </div>

          </div>
      <button class="btn-ver-productos">Ver producto</button>
    </div>
  


    
    <div class="card-product-tarjet">
      <div class="image-product">
          <img src="../media/ass-v1/logos/logoRiwiShop.png" alt="">
      </div>
          <div class="producto-info">
              <div class="producto">
                 <h2>Entregando</h2>
                 <p>Llega el 23 de febrero <span class="fastSend"><span class="material-symbols-outlined">bolt</span>Estandar rapido</span></p>
                 <h6>El patito de riwi de goma semielastico chillon<br>Para bañera sin decoloracion</h6>
              </div>
              <div class="info-pago">
                  <p>Empresa Riwi dapB </p>
                  <a href="">Enviar un mensaje</a>
              </div>
              <div class="fechas">
                  <h1>8 de febrero de 2024</h1>
                  <p>Fecha del pedido: <span>10/03/24</span></p>
               
              </div>

          </div>
      <button class="btn-ver-productos">Ver producto</button>
    </div>
  
    


    <div class="card-product-tarjet">
      <div class="image-product">
          <img src="../media/ass-v1/public/Imagen de WhatsApp 2024-02-03 a las 09.41.04_95607ec0.jpg" alt="">
      </div>
          <div class="producto-info">
              <div class="producto">
                 <h2>Entregando</h2>
                 <p>Llega el 23 de febrero <span class="normalSend"><span class="material-symbols-outlined">local_shipping</span>Normal entrega</span></p>
                 <h6>El patito de riwi de goma semielastico chillon<br>Para bañera sin decoloracion</h6>
              </div>
              <div class="info-pago">
                  <p>Empresa Riwi dapB </p>
                  <a href="">Enviar un mensaje</a>
              </div>
              <div class="fechas">
                  <h1>9 de febrero de 2024</h1>
                  <p>Fecha del pedido: <span>10/02/24</span></p>
               
              </div>

          </div>
      <button class="btn-ver-productos">Ver producto</button>
    </div>
  
  </div>
</div>
    `;

    
}

function backHome(){
  window.location.href = '../LandingPage.html';
}

function backcarrito(){
  window.location.href = 'shoppingCar.html';
}

function editProfile() {
  const inputs = document.querySelectorAll(".information input");

  inputs.forEach((input) => {
    input.readOnly = false;
    input.classList.add("edit-profile");
  });

  document.getElementById("name-label").style.display = "block";
  document.getElementById("lastname-label").style.display = "block";
  information.querySelector(".check").style.display = "block";
}

function checkProfile() {
  const inputs = document.querySelectorAll(".information input");

  inputs.forEach((input) => {
    input.readOnly = true;
    input.classList.remove("edit-profile");
  });

  document.getElementById("name-label").style.display = "none";
  document.getElementById("lastname-label").style.display = "none";
  information.querySelector(".check").style.display = "none";
}



