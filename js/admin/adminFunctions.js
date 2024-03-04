import { cleanInformation } from "../utilities/DOM_utility.js"

export function editUsers(contenedor){
 return "Hacer funcion"
}

export function infoModalCategory(contenedor){
    cleanInformation(contenedor);
    contenedor.innerHTML = `
    <form>
        <h1>Categories</h1>
        <label for="Details">Details</label><br>
        <input type="text" id="idCategory"><br>
        <!-- Input for Category name -->
        <label for="name">Category name:</label><br>
        <input type="text" id="name"><br>
        <!-- Buttons -->
        <button type="submit" >Submit</button>
        <button type="button" >Edit</button>
        <button type="button" class="BynClose">Close</button>
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

export async function captureData(inputs){
    const data = {}
    const arrayURL = [];
    //inputs es una lista, lo que hace el foreach es recorrerlo y difereciarlo dependiendo su id --Funcion con mejora
    inputs.forEach( async element=> {
        //Se almacena en idInput, el id de la etiqueta input 
        const idInput = element.getAttribute("id")
        console.log(idInput);
        //Se mira los inputs que tengan el atributo id
        if(!idInput.includes("id")){
            if (idInput == "images"){
                //Variable creada para guardar un recorrido de un objeto y sea mas facil su lectura
                const arrayImages = element.files;
        
                for (let index = 0; index < arrayImages.length; index++) 
                {
                    //La funcion handleFiles obtiene la URL de las imagenes
                    console.log(await handleFiles(arrayImages[index]));
                    arrayURL.push(await handleFiles(arrayImages[index])); //Problema con peticion
                }

            }
            //Muestra mensaje de error por algunos campos vacios 
            if (element.value == "" || element.value == null){
                return console.error(`Campo ${idInput} se encuentra vacio`)        
            }  
        }

    if (idInput == "images"){

        console.log(arrayURL);
        data[`${idInput}`] = `${arrayURL}`;

    }else{

        data[`${idInput}`] = `${element.value}`

    }
        
});
    console.log(data);
}

// export  function handleFiles(file) {
//         var formData = new FormData();
//         formData.append('file', file);
//         formData.append('upload_preset', 'dijp8oem'); // Debes configurar un upload preset en Cloudinary
    
//         fetch('https://api.cloudinary.com/v1_1/dq59qbt6y/image/upload', {
//             method: 'POST',
//             body: formData
//         })
//             .then(response => response.json())
//             .then(data => {
//                 //console.log(data.secure_url); // Aquí obtienes la respuesta de Cloudinary, incluyendo la URL de la imagen
//                 return  data.secure_url;
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//             });
// }

export async function handleFiles(file) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'dijp8oem'); // Debes configurar un upload preset en Cloudinary

        const response = await fetch('https://api.cloudinary.com/v1_1/dq59qbt6y/image/upload', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        console.log(await data.secure_url); // Aquí obtienes la respuesta de Cloudinary, incluyendo la URL de la imagen
        return  data.secure_url;
    } catch (error) {
        console.error('Error:', error);
    }
}
