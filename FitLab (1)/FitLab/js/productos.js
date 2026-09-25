function buscarProducto(id) {
  for (var i = 0; i < productos_catalogo.length; i++) {
    if (productos_catalogo[i].id === id) {
      return productos_catalogo[i];
    }
  }
  return null;
}

function mostrarProductos() {
  var principal = document.getElementById('productosGrid');
  var codProductos = '';
  
  for (var i = 0; i < productos_catalogo.length; i++) {
    var p = productos_catalogo[i];
    codProductos = codProductos + 
      '<div class="producto-card">' +
        '<img src="' + p.imagen + '" alt="' + p.nombre + '">' +
        '<h3>' + p.nombre + '</h3>' +
        '<p class="precio">$' + p.precio.toLocaleString("es-CL") + '</p>' +
        '<p>Stock: ' + p.stock + '</p>' +
        '<button class="btn-detalle" onclick="irAProducto(' + p.id + ')">Ver Detalles</button>' +
        '<button class="btn-agregar" onclick="agregarDirecto(' + p.id + ')">Agregar al Carrito</button>' +
      '</div>';
  }
  
  principal.innerHTML = codProductos;
}
function agregarDirecto(productoId) {
  var carrito = obtenerCarrito();
  var productoEnCarrito = false;
  

  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].id === productoId) {
      carrito[i].cantidad += 1;
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
        cantidad: 1
      });
    }
  }
  
  guardarCarrito(carrito);
  alert('✓ Producto agregado al carrito');
}

function irAProducto(id) {
  window.location.href = 'detalle-producto.html?id=' + id;
}

document.addEventListener('DOMContentLoaded', function() {
  mostrarProductos();
});