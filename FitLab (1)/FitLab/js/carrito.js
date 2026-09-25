function obtenerCarrito() {
  var carritoJSON = localStorage.getItem('carrito');
  if (carritoJSON) {
    return JSON.parse(carritoJSON);
  }
  return [];
}

function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarContadorCarrito();
}

function agregarAlCarrito(productoId) {
  var cantidad = parseInt(document.getElementById('cantidadInput').value);
  
  if (cantidad <= 0) {
    alert('Selecciona una cantidad válida');
    return;
  }
  var carrito = obtenerCarrito();

  var productoEnCarrito = false;
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].id === productoId) {
      carrito[i].cantidad += cantidad;
      productoEnCarrito = true;
      break;
    }
  }

  if (!productoEnCarrito) {
    var producto = buscarProducto(productoId);
    if (producto) {
      carrito.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        cantidad: cantidad
      });
    }
  }
  
  guardarCarrito(carrito);
  alert('✓ Producto agregado al carrito');
}

function actualizarContadorCarrito() {
  var carrito = obtenerCarrito();
  var total = 0;
  
  for (var i = 0; i < carrito.length; i++) {
    total += carrito[i].cantidad;
  }
  
  var contador = document.getElementById('contador-carrito');
  if (contador) {
    contador.innerText = total;
  }
}

function mostrarCarrito() {
  var carrito = obtenerCarrito();
  var contenedor = document.getElementById('carritoContainer');
  var resumenContenedor = document.getElementById('resumenCarrito');
  
  if (carrito.length === 0) {
    contenedor.innerHTML = '<p>Tu carrito está vacío</p>';
    if (resumenContenedor) {
      resumenContenedor.innerHTML = '';
    }
    return;
  }
  
  var codCarrito = '';
  var totalCarrito = 0;
  
  for (var i = 0; i < carrito.length; i++) {
    var item = carrito[i];
    var subtotal = item.precio * item.cantidad;
    totalCarrito += subtotal;
    
    codCarrito = codCarrito + 
      '<div class="carrito-item">' +
        '<img src="' + item.imagen + '" alt="' + item.nombre + '" class="item-imagen">' +
        '<div class="item-info">' +
          '<h3>' + item.nombre + '</h3>' +
          '<p class="precio">$' + item.precio.toLocaleString('es-CL') + '</p>' +
        '</div>' +
        '<div class="item-cantidad">' +
          '<label>Cantidad:</label>' +
          '<input type="number" min="1" value="' + item.cantidad + '" onchange="actualizarCantidad(' + item.id + ', this.value)">' +
        '</div>' +
        '<div class="item-subtotal">' +
          '<p>Subtotal: $' + subtotal.toLocaleString('es-CL') + '</p>' +
        '</div>' +
        '<button class="btn-eliminar" onclick="eliminarDelCarrito(' + item.id + ')">Eliminar</button>' +
      '</div>';
  }
  
  contenedor.innerHTML = codCarrito;

  if (resumenContenedor) {
    var resumen = 
      '<div class="resumen-wrapper">' +
        '<h2>Resumen del Carrito</h2>' +
        '<p>Total: <strong>$' + totalCarrito.toLocaleString('es-CL') + '</strong></p>' +
        '<button class="btn-comprar">Proceder al Pago</button>' +
        '<a href="productos.html" class="btn-seguir-comprando">Seguir Comprando</a>' +
      '</div>';
    resumenContenedor.innerHTML = resumen;
  }
}

function actualizarCantidad(productoId, nuevaCantidad) {
  var cantidad = parseInt(nuevaCantidad);
  
  if (cantidad <= 0) {
    eliminarDelCarrito(productoId);
    return;
  }
  
  var carrito = obtenerCarrito();
  
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].id === productoId) {
      carrito[i].cantidad = cantidad;
      break;
    }
  }
  
  guardarCarrito(carrito);
  mostrarCarrito();
}

function eliminarDelCarrito(productoId) {
  var carrito = obtenerCarrito();
  var nuevoCarrito = [];
  
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].id !== productoId) {
      nuevoCarrito.push(carrito[i]);
    }
  }
  
  guardarCarrito(nuevoCarrito);
  mostrarCarrito();
}

document.addEventListener('DOMContentLoaded', function() {
  actualizarContadorCarrito();

  if (document.getElementById('carritoContainer')) {
    mostrarCarrito();
  }
});