import { actualizarCarrito } from "../../js/modals/shopCarr.js";

document.addEventListener('productoEliminado', function(e) {
  // obtenemos el id del producto que se borro del modal
  const carritoIds = e.detail;

  // llamamos la funcion importada para actualizar la tabla
  actualizarCarrito(carritoIds);
});

function añadirDataTabla() {
    // cojemos los datos del local storage
    let data = JSON.parse(localStorage.getItem('carritoIds'));

    // seleccionamos la tabla del DOM
    let tbody = document.querySelector('.tabla-datos');

    // limpiamos la tabla antes de añadir las nuevas filas
    tbody.innerHTML = '';
  
    // un for each sobre los datos porque es una lista
    for(let i=0; i<data.length; i++) {
      //me toco quitarle los puntos a los numeros para poder multiplicarlos
      let precio = Number(data[i].precio.replace(/\./g, ''));
      let cantidad = Number(String(data[i].cantidad).replace(/\./g, ''));
      // creamos un tr
      let tr = document.createElement('tr');
  
      // creamos los td y ponemos los datos encima
      let tablaimg = document.createElement('td');
      let img = document.createElement('img');
      img.className = 'TablaImagen';
      img.src = data[i].imagen;
      tablaimg.appendChild(img);

      let producto = document.createElement('td');
      producto.textContent = data[i].nombre;
  
      let tablaPrecio = document.createElement('td');
      tablaPrecio.textContent = data[i].precio;
  
      let Cantidad = document.createElement('td');

      // para hacer una funcion de aumentar o disminuir la cantidad de un producto añadimos botones
      let botonMas = document.createElement('button');
      botonMas.textContent = '+';

      let botonMenos = document.createElement('button');
      botonMenos.textContent = '-';

      // creamos un nodo para el numero de cantidad
      let numeroCantidad = document.createTextNode(data[i].cantidad);

      //cada vez que se haga click aqui se suma la cantidad
      botonMas.addEventListener('click', function() {
        data[i].cantidad++;
        numeroCantidad.nodeValue = data[i].cantidad;
        MultSubtotal.textContent = precio * data[i].cantidad;
        localStorage.setItem('carritoIds', JSON.stringify(data));
        actualizarCarrito(data);
      });

      //y aqui se disminuye
      botonMenos.addEventListener('click', function() {
        if(data[i].cantidad > 1) {
          data[i].cantidad--;
          numeroCantidad.nodeValue = data[i].cantidad;
          MultSubtotal.textContent = precio * data[i].cantidad;
          localStorage.setItem('carritoIds', JSON.stringify(data));
        }
        actualizarCarrito(data);
      });

      // ponemos los botones al DOM
      Cantidad.appendChild(botonMenos);
      Cantidad.appendChild(numeroCantidad);
      Cantidad.appendChild(botonMas);

      let MultSubtotal = document.createElement('td');
      let subtotal = precio * cantidad;
      let subtotalconpuntos = subtotal.toLocaleString('de-DE');
      MultSubtotal.textContent = subtotalconpuntos;

  
      let botonEliminar = document.createElement('td');
      let img2 = document.createElement('img');
      img2.className = 'Basurero'
      img2.src = "../../media/Assets 2 (package)/iconsCart/basurero.png";
      botonEliminar.appendChild(img2);

      botonEliminar.addEventListener('click', function(){
        // eliminamos el producto de la lista de datos del local storage
        data.splice(i, 1);

        // actualizamos el local storage
        localStorage.setItem('carritoIds', JSON.stringify(data));

        // actualizamos el carrito
      actualizarCarrito(data);
      })
  
      // añade los elementos td al elemento tr
      tr.appendChild(tablaimg);
      tr.appendChild(producto);
      tr.appendChild(tablaPrecio);
      tr.appendChild(Cantidad);
      tr.appendChild(MultSubtotal);
      tr.appendChild(botonEliminar);
  
      // añadimos el tr de ultimas
      tbody.appendChild(tr);
      // console.log(data[i].precio, data[i].cantidad);
    }

  }

  document.addEventListener('carritoActualizado', añadirDataTabla);
  
  // invocamos la funcion
  añadirDataTabla();


  