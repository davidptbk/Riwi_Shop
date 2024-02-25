document.addEventListener("DOMContentLoaded", function () {
    const AddToFavorite = document.querySelectorAll('.like');
    const modalFavorite = document.querySelector('.Contain-liked');
    const iconFavorite = document.querySelector("#favorite-js");
    const titleModalFavorite = document.getElementById('titleModalFavorite');

    // local storage funcional
    let carritoFavs = JSON.parse(localStorage.getItem("carritoFavs")) || [];

    // pintar los identificadores en el local storage
    carritoFavs.forEach(productoLike => {
        agregarIdentificadorFavorito(productoLike);
    });

    // funcion para añadir algo a la lista de favoritos
    AddToFavorite.forEach((button, index) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const productId = index + 1;
    
            // Obtén la información del producto
            const card = document.querySelector(`.card[data-id="${productId}"]`);
            const nombreProducto = card.querySelector('.info-product h2').textContent;
            const precioProducto = card.querySelector('.info-product h2 span').textContent;
            const imagenProducto = card.querySelector('.content-image img').src;
    
            // Verifica si el producto ya está en el carrito
            const productoExistente = carritoFavs.find(producto => producto.id === productId);
    
            if (productoExistente) {
                // Incrementa la cantidad del producto existente
                productoExistente.cantidad++;
            } else {
                // Crea un nuevo producto y lo agrega al carrito
                const productoLike = {
                    id: productId,
                    nombre: nombreProducto,
                    precio: precioProducto,
                    imagen: imagenProducto,
                    // cantidad: 1
                };
                carritoFavs.push(productoLike);
            }
    
            // Actualiza el localStorage
            localStorage.setItem("carritoFavs", JSON.stringify(carritoFavs));
    
            // Actualiza el carrito en la página
            actualizarCarrito(carritoFavs);
        });
    });

    function actualizarCarrito(carritoFavs) {
        const modalFavorite = document.querySelector('.Contain-liked');
    
        // Limpia el contenido actual del carrito
        modalFavorite.innerHTML = '';
    
        // Agrega cada producto al carrito
        carritoFavs.forEach(productoLike => {
            agregarIdentificadorFavorito(productoLike);
        });
    }

    // funcion para agregar un identificador al modalFavorite
    function agregarIdentificadorFavorito(productoLike) {
        const modalFavorite = document.querySelector('.Contain-liked');

        const identificador = document.createElement("div");
        identificador.classList.add("identificador");
        identificador.setAttribute("data-id", productoLike.id);

        // Crea la imagen del producto
        const imageElement = document.createElement("img");
        imageElement.src = productoLike.imagen;
        identificador.appendChild(imageElement);

        // Crea el nombre del producto
        const nombreParrafo = document.createElement("p");
        nombreParrafo.textContent = productoLike.nombre;

        // Crea el contador
        const contador = document.createElement("span");
        contador.classList.add("contador");
        contador.textContent = `${productoLike.cantidad} X`;

        // Crea el contenedor para el nombre y el contador
        const contenedor = document.createElement("div");
        contenedor.className = "info-compra";
        contenedor.appendChild(nombreParrafo);

        // Crea el precio del producto
        const precioParrafo = document.createElement("p");
        precioParrafo.textContent = productoLike.precio;

        // Crea el contenedor para el precio y el contador
        const precio = document.createElement("div");
        precio.className = "precio";
        precio.appendChild(precioParrafo);
        contenedor.appendChild(precio);

        // Crea el botón para eliminar un producto
        const eliminarBoton = document.createElement("i");
        eliminarBoton.className = "bx bxs-x-circle bx-flashing-hover eliminar";
        eliminarBoton.addEventListener("click", () => {
            // Elimina el producto al clickear x
            eliminarIdentificadorFavorito(productoLike.id);
        });

        // Agrega los elementos al identificador, el nombre, el contador y el botón x
        identificador.appendChild(contenedor);
        identificador.appendChild(eliminarBoton);

        // Agrega el identificador al modal
        modalFavorite.appendChild(identificador);
    }

    // funcion para eliminar un producto del modalFavorite y del local storage
    function eliminarIdentificadorFavorito(id) {
        // Filtra el array para no eliminar los demás productos, solo el que se está seleccionando
        carritoFavs = carritoFavs.filter(productoLike => productoLike.id !== id);

        // Actualiza el localStorage
        localStorage.setItem("carritoFavs", JSON.stringify(carritoFavs));

        // Elimina el producto del modal
        const modalFavorite = document.querySelector(".Contain-liked");
        const identificadorExistente = modalFavorite.querySelector(`.identificador[data-id="${id}"]`);
        if (identificadorExistente) {
            modalFavorite.removeChild(identificadorExistente);
        }
    }

});