function añadirDataTabla() {
    // cogemos los datos del local storage
    let data = JSON.parse(localStorage.getItem('carritoIds'));

    
    // seleccionamos la tabla del DOM
    let table = document.querySelector('.listaProductos table');
  
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
      Cantidad.textContent = data[i].cantidad;
  
      let MultSubtotal = document.createElement('td');
      MultSubtotal.textContent = precio * cantidad;
  
      let botonEliminar = document.createElement('td');
      let img2 = document.createElement('img');
      img2.className = 'Basurero'
      img2.src = "../../media/Assets 2 (package)/iconsCart/basurero.png";
      botonEliminar.appendChild(img2);
  
      // Añade los elementos td al elemento tr
      tr.appendChild(tablaimg);
      tr.appendChild(producto);
      tr.appendChild(tablaPrecio);
      tr.appendChild(Cantidad);
      tr.appendChild(MultSubtotal);
      tr.appendChild(botonEliminar);
  
      // añádimos el tr de ultimas
      table.appendChild(tr);
      // console.log(data[i].precio, data[i].cantidad);
    }

  }
  
  // invocamos la funcion
  añadirDataTabla();


  