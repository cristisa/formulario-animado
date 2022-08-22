const nombre = document.getElementById("nombre");
const errorN = document.getElementById("errorN");

/* Agrega escuchador para Nombre */
nombre.addEventListener("change", esValidoN);

/* Función que verifica si el nombre es válido */
function esValidoN () {

    if (nombre.value === "" || nombre.value == null || nombre.value.length < 3) {
        pintaLinea(nombre, "red"); 
        muestraMensaje(errorN, 'El nombre debe tener al menos 3 caracteres');
        return false;

    } else if (nombre.value.length >= 20) {
        pintaLinea(nombre, "red");
        muestraMensaje(errorN, "El nombre debe tener menos de 20 caracteres");
        return false;

    } else if (!(/^[a-zA-Z]+$/.test(nombre.value))) {
        pintaLinea(nombre, "red");
        muestraMensaje(errorN, "El nombre solo permite letras");
        return false;

    } else {
        pintaLinea(nombre, "green");
        muestraMensaje(errorN,"");
        return true;
    }
}

const errorC = document.getElementById("errorC");
const correo = document.getElementById("email");

/* Agrega escuchador para Correo */
correo.addEventListener("change", esValidoC);

/* Función que verifica si el correo es válido y devuelve un booleano*/
function esValidoC () {

    if (!(/^[a-zA-Z0-9/_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z.][a-zA-Z.]+$/.test(correo.value))) {
        pintaLinea(correo,"red");
        muestraMensaje(errorC,`El formato de correo debe ser:
        correo@dominio.com`);
        return false;
    
    } else {
        pintaLinea(correo,"green");
        muestraMensaje(errorC,"");
        return true;
    }
}


const boton = document.getElementById("boton");
const form = document.getElementById("form");

/* Agrega escuchador a boton */
boton.addEventListener("click", todoEsValido);

/* Función que verifica si todo el formulario es válido de ser así
tienes la opción de enviarlo o no. Si el formulario no es válido te
señala los errores */
function todoEsValido(e) {

    if (esValidoN() && esValidoC()) {
        if (confirm("¿Deseas enviar el formulario?")) {
            escondeFormulario();
            esperaTiempo(muestraVideo, 500);
            esperaTiempo(mensajeEnviadoYa, 5500);
            esperaTiempo(enviaFormulario, 9000); 
        } else {
            e.preventDefault();
            pintaLinea(nombre, "purple");
            pintaLinea(correo, "purple");
            document.getElementById("form").reset();
        }
    } else {
        esValidoN();
        esValidoC();
        alert("Hay errores en el formulario");
        e.preventDefault();
    }
}

/* Función que muestra el mensaje de error */
function muestraMensaje(error, mensaje) {
    error.innerHTML = `<span style="color: red; font-size: smaller !important; display: block">${mensaje}</span>`
}

/* Función que pinta línea */
function pintaLinea(elemento, color) {
    elemento.style.borderBottom = `2px solid ${color}`;
}

/* Función que esconde formulario */
function escondeFormulario() {

    document.getElementById("caja").style.display = "none";
}

let temporizador;
/* Función que espera un tiempo determinado antes de llamar a la función callback
que recibe */
function esperaTiempo(callback, tiempo) {
    temporizador = setTimeout(callback, tiempo);
}

/* Función que muestra vídeo */
function muestraVideo() {
    document.getElementById("enviando").style.display = "block";
}

/* Función que muestra mensaje de enviado */
function mensajeEnviadoYa() {
    document.getElementById("mensajeEnviado").style.display = "block";
}

/* Función que envía formulario */
function enviaFormulario() {
    document.getElementById("form").submit();  
}
