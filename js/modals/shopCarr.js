document.addEventListener("DOMContentLoaded", function () {
    // selectores
    const AddToCart = document.querySelectorAll(".boton-opcion");
    const ModalContent = document.querySelector(".Contain-carrito");
    const titleModalKart = document.getElementById("titleModalKart");

    // mantenedor de clicks segun el identificador y local storage
    const clickCounters = JSON.parse(localStorage.getItem("clickCounters")) || [];

    // local storage funcional.
    let carritoIds = JSON.parse(localStorage.getItem("carritoIds")) || [];

    function vaciarContenido() {
        let elemento = document.querySelector('.Contain-carrito');
        elemento.innerHTML = '';
    }
    vaciarContenido();

    // pintar los identificadores en el local storage.
    carritoIds.forEach(id => {
        agregarIdentificador(id, clickCounters[id]);
    });

    //funcion para poner el icono de shopping al lado de ShopingKart

    // function agregarImagenAlModal() {
    //     const image = document.createElement("img");
    //     image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAANVJREFUSEvtldsNwjAUQ91NYJOyCZ0EmAQxCWzSbgK1dIPyaOI+iPhpfiLlcY/tpkmDyq2pXB9zAS2ACwD2w9i/ADysL2qcAzgDuE9UIYiQa4mgAFT8tAI3K3YYXRBKR4R0JScKQOUs5or7Yp0zxnXKuVCAHgAVH02tX4fjnKcLzk82BXjbrtw6NZ+cIubN3Le0wFGszCnaAuDeb90cwI2rCOL5ZP3fAUujWuxgByT/gTo1KrL9G6iEICP6xV0UXN/xn+w/jVJu5pULHiB1Xa+BBHuqAz6nVjYZoIEDgAAAAABJRU5ErkJggg==";
    //     image.id = "IconBagShopping";
    //     titleModalKart.insertAdjacentElement('afterend', image);
    // }

    // agregarImagenAlModal();

    // funcion para añadir algo al carrito
    AddToCart.forEach((button, index) => {
        button.addEventListener("click", () => {
            const productId = index + 1;

            // incrementador del contador de cliks 
            clickCounters[productId] = (clickCounters[productId] || 0) + 1;

            // esto verifica si el identificador ya esta dentro de la lista
            const identificadorExistente = ModalContent.querySelector(`.identificador[data-id="${productId}"]`);

            if (identificadorExistente) {
                // actualizar el contador del identificador correspondiente
                const contadorElement = identificadorExistente.querySelector(".contador");
                contadorElement.textContent = `${clickCounters[productId]} X`;
            } else {
                // esto es para agregar un identificador al modal
                agregarIdentificador(productId, clickCounters[productId]);

                //añadir el productId a carritoIds y actualizar el local storage
                carritoIds.push(productId);
            }

            localStorage.setItem("carritoIds", JSON.stringify(carritoIds));
            localStorage.setItem("clickCounters", JSON.stringify(clickCounters));
        });
    })

    // funcion para agregar un identificador al modal
    function agregarIdentificador(id, clickCount) {
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

                // contador
                const contador = document.createElement("span");
                contador.classList.add("contador");
                contador.textContent = `${clickCount} X`;

                //contenedor para el nombre y el contador
                const contenedor = document.createElement("div");
                contenedor.className = "info-compra";
                contenedor.appendChild(nombreParrafo);
                contenedor.appendChild(contador);

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

                    //agregamos el precio y el contador al contenedor
                    precioYcontador.appendChild(contador);
                    precioYcontador.appendChild(precioParrafo);

                    //agregamos el contenedor del precio y el contador al contenedor de info-compra
                    contenedor.appendChild(precioYcontador);
                }



                // boton para eliminar un producto
                const eliminarBoton = document.createElement("i");
                eliminarBoton.className = "bx bxs-x-circle bx-flashing-hover eliminar";
                //eliminarBoton.classList.add("eliminar");
                eliminarBoton.addEventListener("click", () => {
                    // elimina el producto al clickear x
                    eliminarIdentificador(id);
                });

                // agrega los elementos al identificador, el nombre, el contador y el boton x
                identificador.appendChild(contenedor);
                identificador.appendChild(eliminarBoton);

                // agregamos el dentificador al modal
                ModalContent.appendChild(identificador);

                // // hay que llamar a subtotal para que se atualice cada vez que se elimina un identificador del modal
                calcularSubtotal();
            }

        } else {
            console.error(`no hay ninguna card con esa data-id="${id}".`);
        }

    }


    // funcion para eliminar un producto del modal y del local storage
    function eliminarIdentificador(id) {
        // filtracion del array para no eliminar los demas id, solo el que se esta seleccionando
        carritoIds = carritoIds.filter(itemId => itemId !== id);

        // despues, que se actualice el local storage
        localStorage.setItem("carritoIds", JSON.stringify(carritoIds));

        //eliminar el recuento de clicks del producto que se borro
        delete clickCounters[id];
        localStorage.setItem("clickCounters", JSON.stringify(clickCounters));

        // eliminamos el identificador del modal
        const identificadorExistente = ModalContent.querySelector(`.identificador[data-id="${id}"]`);
        if (identificadorExistente) {
            ModalContent.removeChild(identificadorExistente);
        }

        // hay que llamar a subtotal para que se atualice cada vez que se elimina un identificador del modal
        calcularSubtotal();
    }

    // funcion para calcular el subtotal
    function calcularSubtotal() {
        // seleccionamoos todos los elementos de precio y contador del html
        const preciosYContador = ModalContent.querySelectorAll('.precioYcontador p');

        // el subtotal empieza desde 0
        let subtotal = 0;

        // iteramos sobre cada precio y contador
        preciosYContador.forEach(precioElement => {
            const precio = parseFloat(precioElement.textContent.replace(/\./g, ''));
            const contadorElement = precioElement.parentElement.querySelector('.contador');
            const contador = parseInt(contadorElement.textContent);

            // agregamos el precio multiplicado por el contador al subtotal
            subtotal += precio * contador;
        });

        const subtotalElement = document.querySelector('.precio-subtotal');
        // actualizamos el contenido del elemento con el subtotal calculado
        subtotalElement.textContent = subtotal.toLocaleString('de-DE');
    }
    calcularSubtotal();

});