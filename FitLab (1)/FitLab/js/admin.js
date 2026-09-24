document.addEventListener('DOMContentLoaded', () => {
    // Lee el LocalStorage con la clave compartida de tus compañeros
    let productos = JSON.parse(localStorage.getItem('productos_catalogo')) || [
        {
            id: 1,
            codigo: 'PROT-001',
            nombre: "Prostar 5 lb",
            categoria: "Proteínas y suplementos",
            precio: 90000,
            stock: 5,
            stockCritico: 5,
            imagen: "img/proteina.jpg",
            descripcion: "Proteína de suero de alta calidad."
        },
        {
            id: 2,
            codigo: 'CREAT-002',
            nombre: "Creatina 300 g",
            categoria: "Proteínas y suplementos",
            precio: 50000,
            stock: 10,
            stockCritico: 5,
            imagen: "img/creatina.jpg",
            descripcion: "Creatina monohidratada micronizada."
        }
    ];

    function formatearPrecio(numero) {
        return new Intl.NumberFormat('es-CL').format(numero);
    }

    const tablaBody = document.getElementById('tabla-productos-body');
    const bannerAlerta = document.getElementById('banner-alerta-stock');
    const btnNuevoProducto = document.getElementById('btn-nuevo-producto');
    const seccionFormulario = document.getElementById('seccion-formulario');
    const formProducto = document.getElementById('form-producto');
    const btnCancelar = document.getElementById('btn-cancelar');
    const formTitulo = document.getElementById('form-titulo');

    const totalProductosCount = document.getElementById('total-productos-count');
    const stockCriticoCount = document.getElementById('stock-critico-count');

    function guardarYRenderizar() {
        localStorage.setItem('productos_catalogo', JSON.stringify(productos));
        if (tablaBody) renderizarTabla();
        if (totalProductosCount) renderizarDashboard();
    }

    function renderizarTabla() {
        tablaBody.innerHTML = '';
        let hayStockCritico = false;

        productos.forEach((prod, index) => {
            const esCritico = prod.stock <= (prod.stockCritico || 5);
            if (esCritico) hayStockCritico = true;

            const tr = document.createElement('tr');
            if (esCritico) tr.classList.add('fila-critica');

            tr.innerHTML = `
                <td><strong>${prod.codigo || 'PROD-' + prod.id}</strong></td>
                <td>${prod.nombre}</td>
                <td>${prod.categoria}</td>
                <td>$${formatearPrecio(prod.precio)}</td>
                <td>${prod.stock}</td>
                <td>${prod.stockCritico || 5}</td>
                <td>
                    ${esCritico 
                        ? '<span class="badge-critico">CRÍTICO</span>' 
                        : '<span class="badge-ok">OK</span>'}
                </td>
                <td style="text-align: center;">
                    <button class="boton" style="padding: 0.3rem 0.6rem; font-size: 0.8rem;" onclick="editarProducto(${index})">✏️ Editar</button>
                    <button class="boton" style="padding: 0.3rem 0.6rem; font-size: 0.8rem; border-color: #e5484d; color: #e5484d;" onclick="eliminarProducto(${index})">🗑️ Eliminar</button>
                </td>
            `;
            tablaBody.appendChild(tr);
        });

        if (bannerAlerta) {
            if (hayStockCritico) {
                bannerAlerta.classList.remove('hidden');
            } else {
                bannerAlerta.classList.add('hidden');
            }
        }
    }

    function renderizarDashboard() {
        const total = productos.length;
        const criticos = productos.filter(p => p.stock <= (p.stockCritico || 5)).length;

        totalProductosCount.textContent = total;
        stockCriticoCount.textContent = criticos;
    }

    if (btnNuevoProducto) {
        btnNuevoProducto.addEventListener('click', () => {
            formProducto.reset();
            document.getElementById('prod-index').value = '';
            formTitulo.textContent = 'Agregar Nuevo Producto';
            limpiarErrores();
            seccionFormulario.classList.remove('hidden');
            seccionFormulario.scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (btnCancelar) {
        btnCancelar.addEventListener('click', () => {
            seccionFormulario.classList.add('hidden');
        });
    }

    window.editarProducto = function(index) {
        const prod = productos[index];
        document.getElementById('prod-index').value = index;
        document.getElementById('prod-codigo').value = prod.codigo || ('PROD-' + prod.id);
        document.getElementById('prod-nombre').value = prod.nombre;
        document.getElementById('prod-categoria').value = prod.categoria;
        document.getElementById('prod-precio').value = prod.precio;
        document.getElementById('prod-stock').value = prod.stock;
        document.getElementById('prod-stock-critico').value = prod.stockCritico || 5;
        document.getElementById('prod-descripcion').value = prod.descripcion || '';

        formTitulo.textContent = 'Editar Producto';
        limpiarErrores();
        seccionFormulario.classList.remove('hidden');
        seccionFormulario.scrollIntoView({ behavior: 'smooth' });
    };

    window.eliminarProducto = function(index) {
        if (confirm('¿Estás seguro de eliminar este producto?')) {
            productos.splice(index, 1);
            guardarYRenderizar();
        }
    };

    if (formProducto) {
        formProducto.addEventListener('submit', (e) => {
            e.preventDefault();
            limpiarErrores();

            const index = document.getElementById('prod-index').value;
            const codigo = document.getElementById('prod-codigo').value.trim();
            const nombre = document.getElementById('prod-nombre').value.trim();
            const categoria = document.getElementById('prod-categoria').value;
            const precio = parseFloat(document.getElementById('prod-precio').value);
            const stock = parseInt(document.getElementById('prod-stock').value);
            const stockCritico = parseInt(document.getElementById('prod-stock-critico').value) || 5;
            const descripcion = document.getElementById('prod-descripcion').value.trim();

            let esValido = true;

            if (!codigo) { mostrarError('err-codigo', 'El código es obligatorio.'); esValido = false; }
            if (!nombre) { mostrarError('err-nombre', 'El nombre es obligatorio.'); esValido = false; }
            if (!categoria) { mostrarError('err-categoria', 'Seleccione una categoría.'); esValido = false; }
            if (isNaN(precio) || precio <= 0) { mostrarError('err-precio', 'Ingrese un precio válido.'); esValido = false; }
            if (isNaN(stock) || stock < 0) { mostrarError('err-stock', 'Ingrese un stock válido.'); esValido = false; }

            if (!esValido) return;

            const productoData = {
                id: index === '' ? Date.now() : productos[index].id,
                codigo: codigo,
                nombre: nombre,
                categoria: categoria,
                precio: precio,
                stock: stock,
                stockCritico: stockCritico,
                imagen: index === '' ? 'img/proteina.jpg' : (productos[index].imagen || 'img/proteina.jpg'),
                descripcion: descripcion
            };

            if (index === '') {
                productos.push(productoData);
            } else {
                productos[index] = productoData;
            }

            guardarYRenderizar();
            seccionFormulario.classList.add('hidden');
        });
    }

    function mostrarError(id, msg) {
        const el = document.getElementById(id);
        if (el) el.textContent = msg;
    }

    function limpiarErrores() {
        document.querySelectorAll('.mensaje-error').forEach(el => el.textContent = '');
    }

    guardarYRenderizar();
});