function añadirDataTabla() {

    let data = JSON.parse(localStorage.getItem('carritoIds'));

    let div = document.querySelector('.produc-infoCheck');

    div.innerHTML = '';

    let tabla = document.createElement('table');
    tabla.className = 'tabla-datos';

    let encabezados = document.createElement('tr');

    let encabezadoProducto = document.createElement('th');
    encabezadoProducto.className = 'encabezado-producto';
    encabezadoProducto.textContent = 'Product';
    encabezados.appendChild(encabezadoProducto);

    let encabezadoPrecio = document.createElement('th');
    encabezadoPrecio.textContent = 'Subtotal';
    encabezadoPrecio.className = 'encabezado-subtotal';
    encabezados.appendChild(encabezadoPrecio);

    tabla.appendChild(encabezados);

    let total = 0;

    for(let i=0; i<data.length; i++) {

      let fila = document.createElement('tr');

      let celdaNombre = document.createElement('td');
      celdaNombre.className ='celdaNombre'
      celdaNombre.textContent = data[i].nombre + ' x' + data[i].cantidad;

      let celdaPrecio = document.createElement('td');
      let precio = Number(data[i].precio.replace(/\./g, ''));
      let cantidad = typeof data[i].cantidad === 'string' ? Number(data[i].cantidad.replace(/\./g, '')) : data[i].cantidad;
      let subtotal = precio * cantidad;
      celdaPrecio.className = 'celda-precio';
      celdaPrecio.textContent = 'cop. ' + subtotal;

      fila.appendChild(celdaNombre);
      fila.appendChild(celdaPrecio);

      tabla.appendChild(fila);

      total += subtotal;
    }

    div.appendChild(tabla);

    let contenedorSubtotal = document.querySelector('.subtotalPrecioSuma');
    contenedorSubtotal.textContent = 'cop. ' + total;

    let iva = total * 0.19;

    let totalConIva = total + iva;

    let contenedorPrecioFinal = document.querySelector('.price-check');
    contenedorPrecioFinal.textContent = 'cop. ' + totalConIva.toLocaleString('es-CO');
}
añadirDataTabla();
