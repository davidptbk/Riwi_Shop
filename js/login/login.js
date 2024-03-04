localStorage.setItem("mode", "login")
//Imports
import { cleanInformation } from "../utilities/DOM_utility.js";
import { captureData, emailToken, minimumCharacters,passwordToken,validatorPassword } from "./logFunctions.js";
import { URL_Users } from "../utilities/API/URLs.js";
import { get, post } from "../utilities/API/functions.js";

//Selectors
const insert = document.querySelector(".container-login");
const image = document.querySelector("#found-image");

let btnLog = document.getElementById("log"); //Mirar como regresar al log in desdea las funciones
let dataInputs = {};
let mode 

//Eventos
document.addEventListener("DOMContentLoaded", () => {
    mode = localStorage.getItem("mode");

    if (mode == "register") {
        insertRegister();
      }
    if (mode == "login") {
        insertLogin();
      }
});

//Functions
function insertRegister() {
  // insert.textContent = ""
  cleanInformation(insert);
  insert.innerHTML = `
    <div class="container" id="container">
		<div class="form-container log-in-container">
			<form id="register-form">
				<h1>Register</h1>
				<div class="social-container">
					<a href="#" class="social"><box-icon name='google' type='logo' ></box-icon></a>
					<a href="#" class="social"><box-icon type='logo' name='github'></box-icon></a>
				</div>
                <span>Ingresase your data</span>
				<input id= "names" type="text" placeholder="Names"/>
				<input id= "lastNames" type="text" placeholder="Last names" />
                <input id = "email" type="email" placeholder="Email">
                <input id = "cellPhone" type="text" placeholder="Phone number">
                <input id = "address" type="text" placeholder="Address">
                <input id = "region" type="text" placeholder="Region">
                <input id = "city" type="text" placeholder="City">
                <input id = "password" type="password" placeholder="Password">
                <input id = "confirmPassword" type="password" placeholder="Confirm Password">
				<button  type = "button" id="log">No account yet?<br><span id="log-in" class="question">Log in</span></button>
				<button type = "submit">Registrer</button>
			</form>
		</div>
		<div class="overlay-container">
			<div class="overlay">
                
				<div class="overlay-panel overlay-right">
                    <div class="shop-icon">
                        <img src="../media/ass-v1/logos/logoRiwiShop.png" alt="">
                    </div>
					<h1>The best products</h1>
					<p>ingresase whith your account for use more fuctions in the shop riwi :)</p>
				</div>
			</div>
		</div>
	</div>
    `;

  image.style.transform = "scale(1.5)";
  localStorage.setItem("mode", "register");

  //Selectors
  const registerForm = document.querySelector("#register-form");
  const inputsRegister = registerForm.querySelectorAll("input");
  btnLog = document.getElementById("log");
  console.log(inputsRegister);

  //Events
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addUser(inputsRegister);
  });

  btnLog.addEventListener("click", (event) => {
    event.preventDefault();
    const id = btnLog.children[1].getAttribute("id");
    console.log(id);

    if (id == "log-in") 
        insertLogin();
    else if (id == "register")
         insertRegister();
    else 
        console.log("No se encuentra accion");
  });
}

function insertLogin() {
  cleanInformation(insert);
  insert.innerHTML = `
    <div class="container" id="container">
        <div class="form-container log-in-container">
            <form  >
                <h1>Log in</h1>
                <span>sign in with</span>
                <div class="social-container">
                    <a href="#" class="social"><box-icon name='google' type='logo' ></box-icon></a>
                    <a href="#" class="social"><box-icon type='logo' name='github'></box-icon></a>
                </div>
                <span>or use your account</span>
                <input id ="email" type="email" placeholder="Email" />
                <input id ="password" type="password" placeholder="Password" />
                <button type = "Button" id="log" >No account yet?<br><span id = "register" class ="question">Sign up</span></button>
                <button type="submit">Log In</button>
            </form>
        </div>
        <div class="overlay-container">
            <div class="overlay">
                    <div class="overlay-panel overlay-right">
                        <div class="shop-icon">
                            <img src="../media/ass-v1/logos/logoRiwiShop.png" alt="">
                        </div>
                        <h1>The best products</h1>
                        <p>Login with your account to use more features in the RiwiShop :)</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

  image.style.transform = "scale(1)";
  localStorage.setItem("mode", "login");

  //Selectors
  const inputsLogin = insert.querySelectorAll("input");
  const form = insert.querySelector("form");
  btnLog = document.getElementById("log");
  
  //Events
  form.addEventListener("submit", (event) => {
    //Data is taken from the web site via the inputs
    dataInputs = captureData(inputsLogin);
  
    event.preventDefault();
    console.log(mode);
    if (mode == "register") {
      validatorSignUp();
    }
    if (mode == "login") {
      validatorLogIn();
    }

  });
  
  btnLog.addEventListener("click", (event) => {
    event.preventDefault();
    const id = btnLog.children[1].getAttribute("id");

    if (id == "log-in")
        insertLogin();
    else if (id == "register") 
        insertRegister();
    else 
        console.log("No se encuentra accion");
  });
}

async function validatorLogIn() {
  //The data is searched in the database to compare the password.
  const user = await get(`${URL_Users}?email=${dataInputs.email}`);

  if (user?.length == 0) return console.error("UNREGISTERED USER");

  if (!validatorPassword(dataInputs.password, user[0].password)) {
    return console.error("WRONG PASSWORD");
  }

  localStorage.setItem("user", JSON.stringify(user));
  window.location.href = "../../LandingPage.html";
}

async function validatorSignUp(inputs) {
  //Data is taken from the web site via the inputs
  dataInputs = captureData(inputs);

  if (await emailToken(dataInputs.email)) {
    console.error("EXISTING EMAIL");
    return false;
  }

  if (minimumCharacters(dataInputs.password)) {
    console.error("The password must have at least 6 characters.");
    return false;
  }

  if (passwordToken(dataInputs.password, dataInputs.confirmPassword)) {
    console.error("PASSWORDS DO NOT MATCH");
    return false;
  }

  return true;
}

async function addUser(inputsRegister) {
  if (await validatorSignUp(inputsRegister)) {
    delete dataInputs["confirmPassword"];
    post(URL_Users, dataInputs);
    window.location.href = "../../LandingPage.html"
  }
}
