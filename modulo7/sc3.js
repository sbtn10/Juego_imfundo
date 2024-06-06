document.addEventListener('DOMContentLoaded', function () {
    const words = document.querySelectorAll('.word');
    const hearts = document.querySelectorAll('.heart');
    const arrowIcon = document.getElementById('arrow-icon');
    const modal2 = document.getElementById("modal");
    let lives = hearts.length;
    let correctCount = 0;
    const totalAdverbs = document.querySelectorAll('.word[data-type="frequency"]').length;

    const audioCorrecto = new Audio('../audio/correcto.mp3');
    const audioIncorrecto = new Audio('../audio/incorrecto.mp3');
    const audioGameOver = new Audio('../audio/gameover.mp3');

    words.forEach(word => {
        word.addEventListener('click', function() {
            if (this.dataset.type === 'frequency') {
                this.classList.add('correct');
                playSound(audioCorrecto);
                correctCount++;
                if (correctCount === totalAdverbs) {
                    showArrowIcon();
                }
            } else {
                this.classList.add('incorrect');
                playSound(audioIncorrecto);
                loseLife();
            }
            this.style.pointerEvents = 'none';
        });
    });

    function loseLife() {
        if (lives > 0) {
            hearts[lives - 1].style.opacity = '0.2';
            hearts[lives - 1].classList.add('lost');
            lives--;
        }
        if (lives === 0) {
            gameOver();
        }
    }

    function gameOver() {
        playSound(audioGameOver);
        const modal = document.getElementById('gameOverModal');
        modal.style.display = 'block';

        const reintentarBtn = document.getElementById('reintentarBtn');
        const salirBtn = document.getElementById('salirBtn');

        reintentarBtn.addEventListener('click', function() {
            location.reload();
        });

        salirBtn.addEventListener('click', function() {
            window.location.href = '../index.html';
        });
    }

    function playSound(sound) {
        sound.pause();
        sound.currentTime = 0;
        sound.play();
    }

    function showArrowIcon() {
        arrowIcon.style.display = 'block';
        modal2.style.display="flex";
        modal2.classList.add("show");
        arrowIcon.addEventListener('click', function () {
            window.location.href = '../final.html';
        });
        setTimeout(() => {
            modal2.classList.remove("show");
            modal2.classList.add("hide");
            setTimeout(() => {
                modal2.style.display = "none";
                modal2.classList.remove("hide");
            }, 500); 
        }, 1200); 
    }
});

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

// Manejo del modal de ayuda
const modal = document.getElementById('miModal');
const iconoAyuda = document.getElementById('abrirModal');
const btnCerrarModal = document.getElementsByClassName('cerrar')[0];

iconoAyuda.addEventListener('click', () => {
    modal.style.display = 'block';
});

btnCerrarModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (evento) => {
    if (evento.target === modal) {
        modal.style.display = 'none';
    }
});