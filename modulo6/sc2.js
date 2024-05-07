let posicionOriginal = null;
let corazonesRestantes = 3;

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    const boton = event.target;
    posicionOriginal = boton.dataset.posicion;
    event.dataTransfer.setData('text', boton.id);
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    const draggableElement = document.getElementById(data);
    const dropzone = event.target;

    if (dropzone.classList.contains('contenedor')) {
        dropzone.appendChild(draggableElement);
        validarRespuesta(dropzone, data);
    }
}
function validarRespuesta(contenedor, botonId) {
    const contenedorId = contenedor.id;
    const botonCorrecto = obtenerBotonCorrecto(contenedorId);

    if (botonId === botonCorrecto) {
        const audioCorrecto = new Audio('/audio/correcto.mp3');
        audioCorrecto.play();
        audioCorrecto.volume=0.5;
    } else {
        const audioIncorrecto = new Audio('/audio/incorrecto.mp3');
        audioIncorrecto.play();
        audioIncorrecto.volume=0.5;
        const boton = document.getElementById(botonId);
        const contenedorOriginal = document.getElementById('botones-container');
        contenedorOriginal.appendChild(boton);
        boton.dataset.posicion = posicionOriginal;
        const contenedorCorazones = document.querySelector('.info');
        const corazones = contenedorCorazones.querySelectorAll('svg');

        if (corazonesRestantes > 0) {
            corazones[corazonesRestantes - 1].classList.add('corazon-roto');
            corazonesRestantes--;
        }

        // Verificar si se acabaron los corazones
        if (corazonesRestantes === 0) {
            mostrarGameOver();
        }
    }

    // Verificar si todos los botones están en el contenedor correcto
    const botonesCorrectos = Array.from(document.querySelectorAll('.contenedor')).every(contenedor => contenedor.children.length > 0);
    if (botonesCorrectos) {

        const arrowIcon = document.getElementById('arrow-icon');
        arrowIcon.style.display = 'block';

        // Agregar el evento clic a la flecha para redireccionar
        arrowIcon.addEventListener('click', function () {
            window.location.href = '../final.html';
        });
    }
}
function mostrarGameOver() {
    const modalGameOver = document.getElementById('gameOverModal');
    modalGameOver.style.display = 'block';

    const reintentarBtn = document.getElementById('reintentarBtn');
    const salirBtn = document.getElementById('salirBtn');

    reintentarBtn.addEventListener('click', function () {
        modalGameOver.style.display = 'none';
        window.location.href = 'game2.html'
    });

    salirBtn.addEventListener('click', function () {
        modalGameOver.style.display = 'none';
        window.location.href = '../index.html'
    });

    audio.volume = 0.0;

    const gameOver = new Audio('/audio/gameover.mp3');
    gameOver.play();
    gameOver.volume = 0.5;
}
function obtenerBotonCorrecto(contenedorId) {
    switch (contenedorId) {
        case 'contenedor1':
            return 'boton4';
        case 'contenedor2':
            return 'boton5';
        case 'contenedor3':
            return 'boton2';
        case 'contenedor4':
            return 'boton1';
        case 'contenedor5':
            return 'boton3';
        default:
            return null;
    }
}

const muteIcon = document.getElementById('mute-icon');
var audio = document.getElementById('audioElement');
audio.volume = 0.03;

let isMuted = false;

muteIcon.addEventListener('click', () => {
    if (!isMuted) {
        audio.muted = true; // Silenciar el audio
        isMuted = true;
    } else {
        audio.muted = false; // Activar el audio
        isMuted = false;
    }
});


// Obtener el botón y el modal
var openModalBtn = document.getElementById('openModalBtn');
var modal = document.getElementById('myModal');

// Función para abrir el modal
openModalBtn.addEventListener('click', function() {
    modal.style.display = 'block';
});

// Función para cerrar el modal al hacer clic fuera de él
window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});
