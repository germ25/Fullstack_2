document
    .getElementById("form-registro")
    .addEventListener("submit", function (event) {

        event.preventDefault();


        // Obtener datos del formulario

        let nombre = document.getElementById("nombre").value.trim();

        let correo = document.getElementById("correo").value.trim();

        let password = document.getElementById("password").value.trim();



        // Obtener espacios de mensajes

        let errorNombre = document.getElementById("error-nombre");

        let errorCorreo = document.getElementById("error-correo");

        let errorPassword = document.getElementById("error-password");



        // Limpiar mensajes anteriores

        errorNombre.textContent = "";

        errorCorreo.textContent = "";

        errorPassword.textContent = "";



        let formularioValido = true;



        // Validar nombre

        if (nombre === "") {


            errorNombre.textContent =
                "Debe ingresar su nombre completo";


            formularioValido = false;

        }




        // Validar correo

        if (correo === "") {


            errorCorreo.textContent =
                "Debe ingresar su correo electrónico";


            formularioValido = false;


        }

        else if (!correo.includes("@")) {


            errorCorreo.textContent =
                "Ingrese un correo válido";


            formularioValido = false;


        }





        // Validar contraseña

        if (password === "") {


            errorPassword.textContent =
                "Debe ingresar una contraseña";


            formularioValido = false;


        }

        else if (password.length < 6) {


            errorPassword.textContent =
                "La contraseña debe tener mínimo 6 caracteres";


            formularioValido = false;


        }





        // Si existe algún error, detenemos

        if (!formularioValido) {

            return;

        }




        // Registro correcto

        alert("Cuenta creada correctamente");


        window.location.href = "login.html";



    });