// Variables 
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const formulario = document.querySelector('#enviar-mail');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



// eventos
eventListeners();
function eventListeners(){
    // Cuando la app se inicia
    document.addEventListener("DOMContentLoaded", iniciarApp);

    // campos del formulario
    email.addEventListener('blur', validarFormulario);//keyup
    asunto.addEventListener('blur', validarFormulario);//keyup
    mensaje.addEventListener('blur', validarFormulario);//keyup

    //reinicia el formulario
    btnReset.addEventListener('click', resetearFormulario);

    // Enviar email
    formulario.addEventListener('submit', enviarFormulario);
}


// funciones
function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
}

// Valida el formulario 
function validarFormulario(e){
    if (e.target.value.length > 0) {
        // elimina los errores del dom 
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
        
    }else{
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type === 'email'){
        // const resultado = e.target.value.indexOf('@');

        if( er.test( e.target.value )){
            // elimina los errores del dom 
            const error = document.querySelector('p.error');
                if(error){
                    error.remove();
                }
        
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        }else{
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no valido');
        }
    }

    if(er.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
    }
}


// Mostrar los mensajes de error
function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');

    if(errores.length === 0){
        formulario.appendChild(mensajeError);
    }

}


// Enviar el email
function enviarFormulario(e){
    e.preventDefault();
    //Mostrar el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    // Quitar el spinner despues de 3 segundos
    setTimeout( ()=> {
        spinner.style.display = 'none';

        // Mensaje de enviado
        const parrafo = document.createElement('p');
        parrafo.textContent = "El mensaje se envio correctamente";
        parrafo.classList.add('text-center','my-10', 'p-3', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');
        formulario.insertBefore(parrafo, spinner);

        //eliminar el mensaje de exito
        setTimeout( () => {
            parrafo.remove();
            resetearFormulario();
        }, 3000);
    }, 3000);
}

// Resetear el formulario
function resetearFormulario(e){
    formulario.reset();
    const border_green = 'border-green-500';
    const border_red = 'border-red-500';
    email.classList.remove(border_green, border_red);
    asunto.classList.remove(border_green, border_red);
    mensaje.classList.remove(border_green, border_red);
    const error = document.querySelector('p.error'); 
    if (error) {
        error.remove();
    }
    iniciarApp();
}

