document
    .getElementById("form-login")
    .addEventListener("submit", function (event) {

        event.preventDefault();


        // Capturar datos
        let correo = document.getElementById("correo").value.trim();

        let password = document.getElementById("password").value.trim();



        // Capturar mensajes de error

        let errorCorreo = document.getElementById("error-correo");

        let errorPassword = document.getElementById("error-password");



        // Limpiar mensajes anteriores

        errorCorreo.textContent = "";

        errorPassword.textContent = "";



        let formularioValido = true;



        // Validación correo vacío

        if (correo === "") {

            errorCorreo.textContent = "Debe ingresar su correo electrónico";

            formularioValido = false;

        }



        // Validación formato correo

        else if (!correo.includes("@")) {

            errorCorreo.textContent = "Ingrese un correo válido";

            formularioValido = false;

        }




        // Validación contraseña

        if (password === "") {

            errorPassword.textContent = "Debe ingresar su contraseña";

            formularioValido = false;

        }



        else if (password.length < 6) {

            errorPassword.textContent =
                "La contraseña debe tener mínimo 6 caracteres";

            formularioValido = false;

        }




        // Si hay errores, detenemos el envío

        if (!formularioValido) {

            return;

        }




        // Usuario de prueba administrador

        if (
            correo === "admin@fitlab.cl" &&
            password === "123456"
        ) {


            alert("Inicio de sesión correcto");


            window.location.href = "admin_dashboard.html";


        }


        else {


            errorPassword.textContent =
                "Correo o contraseña incorrectos";


        }



    });