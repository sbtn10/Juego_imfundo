document.addEventListener('DOMContentLoaded', function () {
    const muteIcon = document.querySelector('#mute-icon');
const soundIcon = document.querySelector('#sound-icon');
var audio = document.querySelector('#audioElement');
audio.volume = 0.03;

let isMuted = false;

soundIcon.addEventListener('click', () => {
    audio.volume = isMuted ? 0.03 : 0;
    isMuted = !isMuted;
    const icono = document.getElementById("mute-icon");
    const icon = document.getElementById("sound-icon");
    icon.style.display = 'none';
    icono.style.display = 'block';
});

muteIcon.addEventListener('click', () => {
    audio.volume = isMuted ? 0.03 : 0;
    isMuted = !isMuted;
    const icono = document.getElementById("mute-icon");
    const icon = document.getElementById("sound-icon");
    icon.style.display = 'block';
    icono.style.display = 'none';
});

    const correctMessage = document.getElementById('correct-message');
    const errorMessage = document.getElementById('error-message');
    const completedMessage = document.getElementById('completed');
    const modalGameOver = document.getElementById('gameOverModal');

    // Sonidos
    const audioCorrecto = new Audio('../audio/correcto.mp3');
    const audioIncorrecto = new Audio('../audio/incorrecto.mp3');
    const audioGameOver = new Audio('../audio/gameover.mp3');
    const cards = document.querySelectorAll('.carta');
    let selectedCard = null;
    let selectedWord = null;
    let attempts = 0;
    const maxAttempts = 3;
    let matchedPairs = 0;
    const totalPairs = cards.length / 2;
    let lives = 3; // Número inicial de vidas

    // Selector de corazones
    const hearts = document.querySelectorAll('.heart');

    function animateHeartDisappearance(heart) {
        heart.style.transition = 'opacity 0.5s ease-out'; // Agrega una transición para el efecto de desvanecimiento
        heart.style.opacity = '0'; // Reduce gradualmente la opacidad del corazón hasta que desaparezca
        setTimeout(() => {
            heart.style.display = 'none'; // Oculta el corazón después de que termine la animación
        }, 500); // La duración de la transición es de 0.5 segundos
    }

    var closeSVG = document.querySelector(".close-svg");

    // Función para manejar el clic en el SVG de cierre
    function handleCloseClick() {
        // Redirigir a la página de inicio
        window.location.href = "https://www.ejemplo.com";
    }

    function voltearCarta(carta) {
        // Verifica si la carta ya está volteada
        if (!carta.classList.contains('volteada')) {
            // Agrega una clase para indicar que la carta está siendo volteada
            carta.classList.add('volteando');
            
            // Espera un breve período de tiempo para que la clase se aplique antes de agregar la clase 'volteada'
            setTimeout(() => {
                carta.classList.toggle('volteada');
                // Deshabilita el evento onclick para evitar que se voltee nuevamente
                carta.onclick = null;
                // Oculta el cursor cuando la carta esté volteada
                carta.style.cursor = 'default';
            }, 200); // Puedes ajustar este valor según la duración de tu animación CSS
        }
    }
    function selectCard() {
        // Aquí puedes implementar la lógica para seleccionar una carta
    }

    cards.forEach(card => {
        card.addEventListener('click', function() {
            selectCard();
            voltearCarta(this); // Voltea la carta al hacer clic en ella
        });
    });

    function playAudio(audio) {
        if (audio.paused) {
            audio.currentTime = 0;
            audio.play();
        } else {
            audio.pause();
            audio.currentTime = 0;
            audio.play();
        }
    }
});