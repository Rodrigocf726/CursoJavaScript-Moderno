// Variables 
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

// Eventos
cargarEventListeners();
function cargarEventListeners(){
    // funcion que nos permite añadir el elemento al carrito
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar el carrito 
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];  //reiniciamos el carrito
        limpiarHTML(); //eliminamos todo el html
    });
}

// Funciones
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        // elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );

        carritoHTML(); //iterar sobre el carrito y crear de nuevo el html
    }
}

//lee el contenido del html al que demos click 
function leerDatosCurso(curso){
    // console.log(curso);
    // Crear un objeto con el contenido del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    // console.log(infoCurso);

    // Revisa si un elemeto ya existe un elemento 
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );

    if(existe){
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if( curso.id === infoCurso.id ){
                curso.cantidad++;
                // retorna el objeto actualizado
                return curso;
            }else{
                // Retorna los objetos no duplicados
                return curso;
            }
        });

        articulosCarrito = [...cursos];

    }else{
        // Agregamos al carrito
        // Agrega elementos al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }



    carritoHTML();
}

// Muestra el carrito de compras en el HTML
function carritoHTML(){
    // Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el html
    articulosCarrito.forEach( curso => {
        const {titulo, imagen, precio, id, cantidad} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${imagen}" width="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${curso.id}">X</a></td>
        `;
        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });


}

// Elimina los cursos del tbody
function limpiarHTML(){
    // contenedorCarrito.innerHTML = ''; forma lenta 
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}