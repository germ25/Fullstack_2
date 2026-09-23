/* Validaciones del formulario de Contacto */

document.addEventListener("DOMContentLoaded", () => {
    const formContacto = document.getElementById("form-contacto");
    if (formContacto) {
        formContacto.addEventListener("submit", validarContacto);
    }
});

function validarContacto(event) {
    event.preventDefault(); // evita que el formulario se envie mientras validamos

    let esValido = true;

    // --- Nombre: requerido, maximo 100 caracteres ---
    const nombre = document.getElementById("nombre");
    const errorNombre = document.getElementById("error-nombre");
    if (nombre.value.trim() === "") {
        errorNombre.textContent = "El nombre es obligatorio.";
        esValido = false;
    } else if (nombre.value.length > 100) {
        errorNombre.textContent = "El nombre no puede superar los 100 caracteres.";
        esValido = false;
    } else {
        errorNombre.textContent = "";
    }

    // --- Correo: requerido, maximo 100 caracteres, solo dominios permitidos ---
    const correo = document.getElementById("correo");
    const errorCorreo = document.getElementById("error-correo");
    const dominiosPermitidos = /@(duocuc\.cl|profesor\.duocuc\.cl|gmail\.com)$/;
    if (correo.value.trim() === "") {
        errorCorreo.textContent = "El correo es obligatorio.";
        esValido = false;
    } else if (correo.value.length > 100) {
        errorCorreo.textContent = "El correo no puede superar los 100 caracteres.";
        esValido = false;
    } else if (!dominiosPermitidos.test(correo.value)) {
        errorCorreo.textContent = "Solo se aceptan correos @duocuc.cl, @profesor.duocuc.cl o @gmail.com.";
        esValido = false;
    } else {
        errorCorreo.textContent = "";
    }

    // --- Comentario: requerido, maximo 500 caracteres ---
    const comentario = document.getElementById("comentario");
    const errorComentario = document.getElementById("error-comentario");
    if (comentario.value.trim() === "") {
        errorComentario.textContent = "El comentario es obligatorio.";
        esValido = false;
    } else if (comentario.value.length > 500) {
        errorComentario.textContent = "El comentario no puede superar los 500 caracteres.";
        esValido = false;
    } else {
        errorComentario.textContent = "";
    }

    if (esValido) {
        alert("Mensaje enviado correctamente.");
        event.target.reset();
    }
}