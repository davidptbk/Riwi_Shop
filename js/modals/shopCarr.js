document.addEventListener("DOMContentLoaded", function () {
    // selectores
    const AddToCart = document.querySelectorAll(".boton-opcion");
    const ModalContent = document.querySelector(".Contain-carrito");
    const titleModalKart = document.getElementById("titleModalKart");

    // Cargamos el subtotal desde localStorage
    const subtotal = localStorage.getItem("subtotal");
    if (subtotal) {
        const subtotalElement = document.querySelector('.precio-subtotal');
        subtotalElement.textContent = parseFloat(subtotal).toLocaleString('de-DE');
    }

    // local storage funcional.
    let carritoIds = JSON.parse(localStorage.getItem("carritoIds")) || [];

    // pintar los identificadores en el local storage.
    carritoIds.forEach(producto => {
        agregarIdentificador(producto);
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
    
            // Obtén la información del producto
            const card = document.querySelector(`.card[data-id="${productId}"]`);
            const nombreProducto = card.querySelector('.info-product h2').textContent;
            const precioProducto = card.querySelector('.info-product h2 span').textContent;
            const imagenProducto = card.querySelector('.content-image img').src;
    
            // Verifica si el producto ya está en el carrito
            const productoExistente = carritoIds.find(producto => producto.id === productId);
    
            if (productoExistente) {
                // Incrementa la cantidad del producto existente
                productoExistente.cantidad++;
            } else {
                // Crea un nuevo producto y lo agrega al carrito
                const producto = {
                    id: productId,
                    nombre: nombreProducto,
                    precio: precioProducto,
                    imagen: imagenProducto,
                    cantidad: 1
                };
                carritoIds.push(producto);
            }
    
            // Actualiza el localStorage
            localStorage.setItem("carritoIds", JSON.stringify(carritoIds));
    
            // Actualiza el carrito en la página
            actualizarCarrito(carritoIds);
        });
    });
    
    function actualizarCarrito(carritoIds) {
        const ModalContent = document.querySelector(".Contain-carrito");
    
        // Limpia el contenido actual del carrito
        ModalContent.innerHTML = '';
    
        // Agrega cada producto al carrito
        carritoIds.forEach(producto => {
            agregarIdentificador(producto);
        });
    }

    // Función para agregar un producto al carrito
    function agregarIdentificador(producto) {
        const ModalContent = document.querySelector(".Contain-carrito");

        const identificador = document.createElement("div");
        identificador.classList.add("identificador");
        identificador.setAttribute("data-id", producto.id);

        // Crea la imagen del producto
        const imageElement = document.createElement("img");
        imageElement.src = producto.imagen;
        identificador.appendChild(imageElement);

        // Crea el nombre del producto
        const nombreParrafo = document.createElement("p");
        nombreParrafo.textContent = producto.nombre;

        // Crea el contador
        const contador = document.createElement("span");
        contador.classList.add("contador");
        contador.textContent = `${producto.cantidad} X`;

        // Crea el contenedor para el nombre y el contador
        const contenedor = document.createElement("div");
        contenedor.className = "info-compra";
        contenedor.appendChild(nombreParrafo);
        contenedor.appendChild(contador);

        // Crea el precio del producto
        const precioParrafo = document.createElement("p");
        precioParrafo.textContent = producto.precio;
        precioParrafo.classList.add("precioParrafo")

        // Crea el contenedor para el precio y el contador
        const precioYcontador = document.createElement("div");
        precioYcontador.className = "precioYcontador";
        precioYcontador.appendChild(contador);
        precioYcontador.appendChild(precioParrafo);
        contenedor.appendChild(precioYcontador);

        // Crea el botón para eliminar un producto
        const eliminarBoton = document.createElement("i");
        eliminarBoton.className = "bx bxs-x-circle bx-flashing-hover eliminar";
        eliminarBoton.addEventListener("click", () => {
            // Elimina el producto al clickear x
            eliminarIdentificador(producto.id);
        });

        // Agrega los elementos al identificador, el nombre, el contador y el botón x
        identificador.appendChild(contenedor);
        identificador.appendChild(eliminarBoton);

        // Agrega el identificador al modal
        ModalContent.appendChild(identificador);

        // Llama a calcularSubtotal para que se actualice cada vez que se agrega un identificador al modal
        calcularSubtotal();
    }



    // Función para eliminar un producto del carrito y del localStorage
    function eliminarIdentificador(id) {
        // Filtra el array para no eliminar los demás productos, solo el que se está seleccionando
        carritoIds = carritoIds.filter(producto => producto.id !== id);

        // Actualiza el localStorage
        localStorage.setItem("carritoIds", JSON.stringify(carritoIds));

        // Elimina el producto del modal
        const ModalContent = document.querySelector(".Contain-carrito");
        const identificadorExistente = ModalContent.querySelector(`.identificador[data-id="${id}"]`);
        if (identificadorExistente) {
            ModalContent.removeChild(identificadorExistente);
        }

        // Llama a calcularSubtotal para que se actualice cada vez que se elimina un producto del carrito
        calcularSubtotal();
    }


    // Función para calcular el subtotal
    function calcularSubtotal() {
        // Seleccionamos todos los elementos de precio y contador del html
        const preciosYContador = ModalContent.querySelectorAll('.precioYcontador p');
        // El subtotal empieza desde 0
        let subtotal = 0;
        // Iteramos sobre cada precio y contador
        preciosYContador.forEach(precioElement => {
            const precio = parseFloat(precioElement.textContent.replace(/\./g, ''));
            const contadorElement = precioElement.parentElement.querySelector('.contador');
            const contador = parseInt(contadorElement.textContent);
            // Agregamos el precio multiplicado por el contador al subtotal
            subtotal += precio * contador;
        });
        const subtotalElement = document.querySelector('.precio-subtotal');
        // Actualizamos el contenido del elemento con el subtotal calculado
        subtotalElement.textContent = subtotal.toLocaleString('de-DE');

        // Guardamos el subtotal en localStorage
        localStorage.setItem("subtotal", subtotal);
    }
});