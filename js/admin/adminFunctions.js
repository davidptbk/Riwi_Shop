import { cleanInformation } from "../utilities/DOM_utility.js"

export function editUsers(contenedor){
 return "Hacer funcion"
}

export function infoModalCategory(contenedor){
    cleanInformation(contenedor);
    contenedor.innerHTML = `
    <form>
        <input type="text" id="idCategory"><br>
        <!-- Input for Category name -->
        <label for="name">Category name:</label><br>
        <input type="text" id="name"><br>
        <!-- Buttons -->
        <button type="submit" >Submit</button>
        <button type="button" >Edit</button>
    </form>
    `
}

export function infoModalProduct(contenedor){
    cleanInformation(contenedor);
    contenedor.innerHTML = `
    <form>
        <input type="text" id="idProduct"><br>

        <!-- Input for Product name -->
        <label for="title">Product Name:</label><br>
        <input type="text" id="title"><br>
        <!-- Input for Description -->
        <label for="description">Description:</label><br>
        <input type="text" id="description"><br>
        <!-- Input for Images -->
        <label for="images">Images:</label><br>
        <input type="file" id="images" multiple><br>
        <!-- Input for Dealear -->
        <label for="dealer">Dealear:</label><br>
        <input type="text" id="dealer"><br>
        <!-- Input for Price -->
        <label for="price">Price:</label><br>
        <input type="text" id="price"><br>
        <!-- Input for Model -->
        <label for="model">Model:</label><br>
        <input type="text" id="model"><br>
        <!-- Input for Category -->
        <label for="category">Category:</label><br>
        <input type="text" id="category"><br>
        <!-- Input for Features -->
        <label for="features">Features:</label><br>
        <input type="text" id="features"><br>
        <!-- Buttons -->
        <button type="submit" >Submit</button>
        <button type="button" >Edit</button>
    </form>
    `
}

export function infoModalUser(contenedor){
    cleanInformation(contenedor);
    contenedor.innerHTML = `
    <form>
        <input type="text" id="idUser"><br>
        <!-- Input for role -->
        <label for="role">Role:</label><br>
        <select id="role">
            <option value="admin">Administrator</option>
            <option value="user">Customer</option>
        </select><br>
        <!-- Input for User name -->
        <label for="names">User Name:</label><br>
        <input type="text" id="names"><br>
        <!-- Input for User User lastNames -->
        <label for="lastNames">User lastnames:</label><br>
        <input type="text" id="lastNames"><br>
        <!-- Input for Email -->
        <label for="email">Email:</label><br>
        <input type="email" id="email"><br>
        <!-- Input for Cellphone -->
        <label for="cellphone">Cellphone:</label><br>
        <input type="text" id="cellphone"><br>
        <!-- Input for Region -->
        <label for="region">Region:</label><br>
        <input type="text" id="region"><br>
        <!-- Input for City -->
        <label for="city">City:</label><br>
        <input type="text" id="city"><br>
        <!-- Input for Address -->
        <label for="address">Address:</label><br>
        <input type="text" id="address"><br>
        <!-- Buttons -->
        <button type="submit" >Submit</button>
        <button type="button" >Edit</button>
    </form>
    `

}

export function captureData(inputs){
    const data = {}
    inputs.forEach( element=> {
    const idInput = element.getAttribute("id")
    console.log(idInput);
    if(!idInput.includes("id")){
        if (idInput == "images"){
            handleFiles();
            console.log("entre");
        }

        if (element.value == "" || element.value == null){
            return console.error(`Campo ${idInput} se encuentra vacio`)        
        }

        
    }
    data[`${idInput}`] = `${element.value}`
});
    console.log(data);
    
}

export function handleFiles() {
    const files = document.getElementById('images').value;
    console.log(files)
    


    
}

