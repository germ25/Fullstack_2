function obtenerIdDelProducto() {
  var url = window.location.search;
  var params = new URLSearchParams(url);
  var id = params.get('id');
  return parseInt(id);
}

function buscarProducto(id) {
  for (var i = 0; i < productos_catalogo.length; i++) {
    if (productos_catalogo[i].id === id) {
      return productos_catalogo[i];
    }
  }
  return null;
}

function mostrarDetalleProducto() {
  var productoId = obtenerIdDelProducto();
  var producto = buscarProducto(productoId);
  var contenedor = document.getElementById('detalleContainer');
  
  if (!producto) {
    contenedor.innerHTML = '<p>Producto no encontrado</p>';
    return;
  }
  
  var codDetalle = 
    '<div class="detalle-wrapper">' +
      '<div class="detalle-imagen">' +
        '<img src="' + producto.imagen + '" alt="' + producto.nombre + '">' +
      '</div>' +
      '<div class="detalle-info">' +
        '<h1>' + producto.nombre + '</h1>' +
        '<p class="categoria">' + producto.categoria + '</p>' +
        '<p class="precio-grande">$' + producto.precio.toLocaleString('es-CL') + '</p>' +
        '<p class="stock">Stock disponible: <strong>' + producto.stock + '</strong></p>' +
        '<div class="cantidad-selector">' +
          '<label>Cantidad:</label>' +
          '<input type="number" id="cantidadInput" min="1" max="' + producto.stock + '" value="1">' +
        '</div>' +
        '<button class="btn-agregar-grande" onclick="agregarAlCarrito(' + producto.id + ')">Agregar al Carrito</button>' +
        '<button class="btn-volver" onclick="window.history.back()">← Volver</button>' +
      '</div>' +
    '</div>';
  
  contenedor.innerHTML = codDetalle;
}

function agregarAlCarrito(productoId) {
  var cantidad = parseInt(document.getElementById('cantidadInput').value);
  
  if (cantidad <= 0) {
    alert('Selecciona una cantidad válida');
    return;
  }
  
  alert('✓ Agregado ' + cantidad + ' unidad(es) al carrito');
}
document.addEventListener('DOMContentLoaded', function() {
  mostrarDetalleProducto();
});