document.addEventListener("DOMContentLoaded", function () {
    const AddToFavorite = document.querySelectorAll('.like');
    const modalFavorite = document.querySelector('.Contain-liked');
    const iconFavorite = document.querySelector("#favorite-js");
    const titleModalFavorite = document.getElementById('titleModalFavorite');

    // local storage funcional
    let carritoFavs = JSON.parse(localStorage.getItem("carritoFavs")) || [];

    // pintar los identificadores en el local storage
    carritoFavs.forEach(id => {
        agregarIdentificadorFavorito(id);
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
                modalFavorite.appendChild(identificador);
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
        const identificadorExistente = modalFavorite.querySelector(`.identificador[data-id="${id}"]`);
        if (identificadorExistente) {
            modalFavorite.removeChild(identificadorExistente);
        }
    }

});

