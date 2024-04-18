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
    } else {
        const audioCorrecto = new Audio('/audio/incorrecto.mp3');
        audioCorrecto.play();
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
}
function mostrarGameOver() {
    const modalGameOver = document.getElementById('gameOverModal');
    modalGameOver.style.display = 'block';

    const reintentarBtn = document.getElementById('reintentarBtn');
    const salirBtn = document.getElementById('salirBtn');

    reintentarBtn.addEventListener('click', function() {
        modalGameOver.style.display = 'none';
        window.location.href='game2.html'
    });

    salirBtn.addEventListener('click', function() {
        modalGameOver.style.display = 'none';
        window.location.href='index.html'
    });

    audio.volume=0.0;

    const gameOver = new Audio('/audio/gameover.mp3');
    gameOver.play();
    gameOver.volume=0.5;
}
function obtenerBotonCorrecto(contenedorId) {
    switch (contenedorId) {
        case 'contenedor1':
            return 'boton3';
        case 'contenedor2':
            return 'boton5';
        case 'contenedor3':
            return 'boton1';
        case 'contenedor4':
            return 'boton4';
        case 'contenedor5':
            return 'boton2';
        default:
            return null;
    }
}

var audio = document.getElementById('audioElement');
      audio.volume = 0.03;