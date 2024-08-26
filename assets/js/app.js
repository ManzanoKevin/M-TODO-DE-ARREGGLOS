let totalTareas = 0;
let tareasRealizadas = 0;
let idCounter = 1;

// Llamando al DOM
const input = document.getElementById('input');
const btnAgregar = document.getElementById('button-addon2');
const listaID = document.querySelector('.IDD ul');
const listaTareas = document.querySelector('.tareaa ul');
const totalElement = document.querySelector('#total');
const realizadasElement = document.querySelector('#realizadas');

// Array de 3 tareas iniciales
const tareasIniciales = [
    { id: 1, texto: 'Lavar' },
    { id: 2, texto: 'Comer' },
    { id: 3, texto: 'Planchar' }
];

// Función para inicializar las tareas
function inicializarTareas() {
    tareasIniciales.forEach(tarea => {
        agregarTareaHTML(tarea.id, tarea.texto);

        // Actualizar el contador
        totalTareas++;
        idCounter = Math.max(idCounter, tarea.id + 1); // Asegura que el contador de ID sea mayor que el mayor ID inicial
    });

    // Actualizar contadores iniciales
    actualizarContadores();
}

// Función para agregar una nueva tarea
function agregarTarea() {
    const tareaTexto = input.value.trim();

    if (tareaTexto !== "") {
        agregarTareaHTML(idCounter, tareaTexto);

        // Actualizar los contadores
        totalTareas++;
        idCounter++;
        actualizarContadores();

        // Limpiar input
        input.value = "";
    }
}

// Función para agregar HTML de tarea
function agregarTareaHTML(id, texto) {
    // Crear el contenedor de la tarea
    const liTarea = document.createElement('li');
    liTarea.classList.add('tarea-item');
    liTarea.setAttribute('data-id', id); // Añadir atributo data-id para referencia

    liTarea.innerHTML = `
        <span>${id}</span>
        <div class="tarea-texto">${texto}</div>
        <div class="controls">
            <input type="checkbox" class="form-check-input" onchange="actualizarRealizadas(event)">
            <button class="btn btn-danger btn-sm" onclick="eliminarTarea(event)">❌</button>
        </div>
    `;

    // Añadir la tarea a la lista
    listaTareas.appendChild(liTarea);

    // Añadir ID a la lista de IDs
    const liID = document.createElement('li');
    // liID.textContent = id;
    listaID.appendChild(liID);
}

// Función para actualizar los contadores
function actualizarContadores() {
    totalElement.textContent = totalTareas;
    realizadasElement.textContent = tareasRealizadas;
}

// Función para actualizar el número de tareas realizadas
function actualizarRealizadas(event) {
    if (event.target.checked) {
        tareasRealizadas++;
    } else {
        tareasRealizadas--;
    }
    actualizarContadores();
}

// Función para eliminar una tarea
function eliminarTarea(event) {
    const tareaElement = event.target.closest('.tarea-item');
    const tareaId = tareaElement.getAttribute('data-id');

    // Ajustar el contador de realizadas si estaba marcada
    if (tareaElement.querySelector('input[type="checkbox"]').checked) {
        tareasRealizadas--;
    }

    // Eliminar tarea
    listaTareas.removeChild(tareaElement);

    // Eliminar el ID respectivo
    const idElements = listaID.querySelectorAll('li');
    idElements.forEach(idElement => { // FOREACH UTILIZADO
        if (idElement.textContent == tareaId) {
            listaID.removeChild(idElement);
        }
    });

    // Actualiza contadores
    totalTareas--;
    actualizarContadores();
}

// Evento de click para agregar tareas
btnAgregar.addEventListener('click', agregarTarea);

// Evento de teclado para agregar con "Enter"
input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        agregarTarea();
    }
});

// Inicializar las tareas al cargar la página
window.addEventListener('DOMContentLoaded', inicializarTareas);