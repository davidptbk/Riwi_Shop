import { CerrarModalFavorite } from "./modal"

document.addEventListener("DOMContentLoaded", function () {
    const ModalFavoriteList = document.querySelector(".corazon-but");
    const AddToFavorite = document.querySelectorAll('.Contain-liked');
    const ModalContentFavorite = document.querySelector(".");
    const modalFavorite = document.querySelector('.liked');
    const iconFavorite = document.querySelector("#favorite-js");
    const titleModalFavorite = document.querySelector('#titleModalFavorite');
    const image = document.createElement("img");
    const efect = document.querySelector(".efect");

    // local storage funcional
    let carritoFavs = JSON.parse(localStorage.getItem("carritoFavs")) || [];

    // pintar los identificadores en el local storage
    carritoFavs.forEach(id => {
        agregarIdentificadorFavorito(id);
    });

    // funcion para abrir y cerrar el modalFavorite
    document.addEventListener("click", (event) => {
        if (event.target === modalFavorite) {
            CerrarModalFavorite();
        }
    });

    // funcion para añadir algo a la lista de favoritos
    AddToFavorite.forEach((button, index) => {
        button.addEventListener("click", () => {
            const productId = index + 1;

            // Verificar si el producto ya está en el carrito
            if (!carritoFavs.includes(productId)) {
                // añadir el productId a carritoFavs y actualizar el local storage
                carritoFavs.push(productId);
                localStorage.setItem("carritoFavs", JSON.stringify(carritoFavs));

                // agregar el producto al modalFavorite
                agregarIdentificadorFavorito(productId);
            } else {
                console.log(`El producto con id ${productId} ya está en el carrito.`);
            }
        });
    });


    // funcion para agregar un identificador al modalFavorite
    function agregarIdentificadorFavorito(id) {
        const identificador = document.createElement("div");
        identificador.classList.add("identificador");
        identificador.setAttribute("data-id", id);

        // esto busca la card correspondiente al identificador
        const card = document.querySelector(`.card[data-id="${id}"]`);

        //verificamos que se haya encontrado una card
        if (card) {
            //obtenemos la imagen del producto
            const imageElement = card.querySelector('.content-image img');
            if (imageElement) {
                //creamos una copia de la imagen
                const imageCopy = imageElement.cloneNode();

                //agregamos la copia de la imagen al identificador
                identificador.appendChild(imageCopy);
            }
            const nombreElement = card.querySelector('.info-product h2');

            if (nombreElement) {
                //obtenemos el nombre del producto
                const nombreProducto = nombreElement.textContent;

                // crear el parrafo con el nombre del producto
                const nombreParrafo = document.createElement("p");
                nombreParrafo.textContent = `${nombreProducto}`;

                //obtenemos el elemento del precio del producto
                const precioElement = card.querySelector('.info-product h2 span');

                if (precioElement) {
                    //obtenemos el precio del procuto
                    const precioProducto = precioElement.textContent;
                    //creamos el parrafo con el precio del producto
                    const precioParrafo = document.createElement("p");
                    precioParrafo.textContent = `${precioProducto}`;

                    //creamos el contenedor para el precio y el contador
                    const precioYcontador = document.createElement("div");
                    precioYcontador.className = "precioYcontador";

                    //agregamos el precio al contenedor
                    precioYcontador.appendChild(precioParrafo);

                    //agregamos el contenedor del precio y el contador al contenedor de info-compra
                    identificador.appendChild(precioYcontador);
                }

                // boton para eliminar un producto
                const eliminarBoton = document.createElement("i");
                eliminarBoton.className = "bx bxs-x-circle bx-flashing-hover eliminar";
                eliminarBoton.addEventListener("click", () => {
                    // elimina el producto al clickear x
                    eliminarIdentificadorFavorito(id);
                });

                // agrega los elementos al identificador, el nombre, el contador y el boton x
                identificador.appendChild(nombreParrafo);
                identificador.appendChild(eliminarBoton);

                // agregamos el dentificador al modalFavorite
                ModalContentFavorite.appendChild(identificador);
            }

        } else {
            console.error(`no hay ninguna card con esa data-id="${id}".`);
        }

    }

    // funcion para eliminar un producto del modalFavorite y del local storage
    function eliminarIdentificadorFavorito(id) {
        // filtracion del array para no eliminar los demas id, solo el que se esta seleccionando
        carritoFavs = carritoFavs.filter(itemId => itemId !== id);

        // despues, que se actualice el local storage
        localStorage.setItem("carritoFavs", JSON.stringify(carritoFavs));

        // eliminamos el identificador del modalFavorite
        const identificadorExistente = ModalContentFavorite.querySelector(`.identificador[data-id="${id}"]`);
        if (identificadorExistente) {
            ModalContentFavorite.removeChild(identificadorExistente);
        }
    }

    //funcion para añadir los botones al final del modalFavorite
    function botonesCartYCheckOutFavorito() {
        const hr = document.createElement('hr');
        //botones que van despues de los identificadores
        const botonCart = document.createElement("button");
        botonCart.textContent = "Cart";
        botonCart.id = "botonCart";
        const botonCheckout = document.createElement("button");
        botonCheckout.textContent = "CheckOut";
        botonCheckout.id = "botonCheckOut";

        //redirecciones para los botones
        botonCheckout.addEventListener("click", () => {
            window.location.href = "/redirects/paymentPage.html"
        })
        botonCart.addEventListener("click", () => {
            window.location.href = "/redirects/Cart.html"
        })

        //crea un contenedor para los botones
        const contenedorCartYCheckOut = document.createElement("div");
        contenedorCartYCheckOut.className = "contenedorCartYCheckOut";

        //agrega los botones al contenedor
        contenedorCartYCheckOut.appendChild(botonCart);
        contenedorCartYCheckOut.appendChild(botonCheckout);

        //agrega el contenedor a ModalContentFavorite solo si no ha sido agregado antes
        if (!ModalContentFavorite.querySelector("#botonCart")) {
            ModalContentFavorite.appendChild(contenedorCartYCheckOut);
        }
    }
    botonesCartYCheckOutFavorito();
});
