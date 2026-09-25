document.addEventListener('DOMContentLoaded', function () {

    // Datos iniciales
    let listaUsuarios = [
        {
            id: 'USR-001',
            rut: '18.421.903-4',
            nombre: 'Francisco Moreno',
            email: 'francisco.moreno@fitlab.cl',
            telefono: '+56 9 8452 1190',
            rol: 'Administrador',
            estado: 'ACTIVO'
        },
        {
            id: 'USR-002',
            rut: '20.155.820-K',
            nombre: 'Matías Sepúlveda',
            email: 'm.sepulveda@gmail.com',
            telefono: '+56 9 7621 0043',
            rol: 'Cliente',
            estado: 'ACTIVO'
        },
        {
            id: 'USR-003',
            rut: '15.932.110-2',
            nombre: 'Carla González V.',
            email: 'c.gonzalez@fitlab.cl',
            telefono: '+56 9 6120 9941',
            rol: 'Entrenador',
            estado: 'INACTIVO'
        }
    ];

    // Elementos del DOM
    const tablaBody = document.getElementById('tablaUsuariosBody');
    const modal = document.getElementById('modalUsuario');
    const modalTitulo = document.getElementById('modalTitulo');
    const formUsuario = document.getElementById('formUsuario');

    const btnAbrirModal = document.getElementById('btnAbrirModal');
    const btnCerrarModal = document.getElementById('btnCerrarModal');
    const btnCancelarModal = document.getElementById('btnCancelarModal');

    const inputId = document.getElementById('usuarioId');
    const inputRut = document.getElementById('inputRut');
    const inputNombre = document.getElementById('inputNombre');
    const inputEmail = document.getElementById('inputEmail');
    const inputTelefono = document.getElementById('inputTelefono');
    const selectRol = document.getElementById('selectRol');
    const selectEstado = document.getElementById('selectEstado');

    // Renderizar filas de la tabla
    function renderizarTabla() {
        tablaBody.innerHTML = '';

        if (listaUsuarios.length === 0) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td colspan="7" class="text-center" style="padding: 2rem; color: #8b949e;">
                    No hay usuarios registrados actualmente.
                </td>
            `;
            tablaBody.appendChild(tr);
            return;
        }

        listaUsuarios.forEach(function (usuario) {
            const tr = document.createElement('tr');
            const claseBadge = usuario.estado === 'ACTIVO' ? 'activo' : 'inactivo';

            tr.innerHTML = `
                <td class="user-rut">${usuario.rut}</td>
                <td class="user-name">${usuario.nombre}</td>
                <td>${usuario.email}</td>
                <td>${usuario.telefono}</td>
                <td>${usuario.rol}</td>
                <td><span class="status-badge ${claseBadge}">${usuario.estado}</span></td>
                <td class="text-center">
                    <div class="action-buttons">
                        <button class="btn-action btn-edit" onclick="editarUsuario('${usuario.id}')">
                            ✏️ Editar
                        </button>
                        <button class="btn-action btn-delete" onclick="eliminarUsuario('${usuario.id}')">
                            🗑️ Eliminar
                        </button>
                    </div>
                </td>
            `;
            tablaBody.appendChild(tr);
        });
    }

    // Modal
    function abrirModal(modoEdicion) {
        if (!modoEdicion) {
            formUsuario.reset();
            inputId.value = '';
            modalTitulo.textContent = 'Agregar Nuevo Usuario';
        }
        modal.classList.add('show');
    }

    function cerrarModal() {
        modal.classList.remove('show');
        formUsuario.reset();
        inputId.value = '';
    }

    btnAbrirModal.addEventListener('click', function () {
        abrirModal(false);
    });

    btnCerrarModal.addEventListener('click', cerrarModal);
    btnCancelarModal.addEventListener('click', cerrarModal);

    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            cerrarModal();
        }
    });

    // Guardar usuario
    formUsuario.addEventListener('submit', function (e) {
        e.preventDefault();

        const id = inputId.value;
        const rut = inputRut.value.trim();
        const nombre = inputNombre.value.trim();
        const email = inputEmail.value.trim();
        const telefono = inputTelefono.value.trim();
        const rol = selectRol.value;
        const estado = selectEstado.value;

        if (id) {
            const indice = listaUsuarios.findIndex(function (u) {
                return u.id === id;
            });
            if (indice !== -1) {
                listaUsuarios[indice] = { id, rut, nombre, email, telefono, rol, estado };
            }
        } else {
            const nuevoId = 'USR-' + String(Date.now()).slice(-3);
            listaUsuarios.push({
                id: nuevoId,
                rut,
                nombre,
                email,
                telefono,
                rol,
                estado
            });
        }

        cerrarModal();
        renderizarTabla();
    });

    // Acciones globales
    window.editarUsuario = function (id) {
        const usuario = listaUsuarios.find(function (u) {
            return u.id === id;
        });
        if (!usuario) return;

        inputId.value = usuario.id;
        inputRut.value = usuario.rut;
        inputNombre.value = usuario.nombre;
        inputEmail.value = usuario.email;
        inputTelefono.value = usuario.telefono;
        selectRol.value = usuario.rol;
        selectEstado.value = usuario.estado;

        modalTitulo.textContent = 'Editar Usuario';
        abrirModal(true);
    };

    window.eliminarUsuario = function (id) {
        const usuario = listaUsuarios.find(function (u) {
            return u.id === id;
        });
        if (!usuario) return;

        if (confirm(`¿Estás seguro de que deseas eliminar al usuario "${usuario.nombre}"?`)) {
            listaUsuarios = listaUsuarios.filter(function (u) {
                return u.id !== id;
            });
            renderizarTabla();
        }
    };

    renderizarTabla();
});