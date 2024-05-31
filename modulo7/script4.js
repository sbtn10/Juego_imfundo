const muteIcon = document.getElementById('mute');
var audio = document.getElementById('audioElement');
audio.volume = 0.03;

let isMuted = false;

muteIcon.addEventListener('click', () => {
    audio.muted = !isMuted; // Alterna el estado de silencio del audio
    isMuted = !isMuted;
});

document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card');
    const words = document.querySelectorAll('.word');
    const correctMessage = document.getElementById('correct-message');
    const errorMessage = document.getElementById('error-message');
    const completedMessage = document.getElementById('completed');
    const modalGameOver = document.getElementById('gameOverModal');

    // Sonidos
    const audioCorrecto = new Audio('../audio/correcto.mp3');
    const audioIncorrecto = new Audio('../audio/incorrecto.mp3');
    const audioGameOver = new Audio('../audio/gameover.mp3');

    let selectedCard = null;
    let selectedWord = null;
    let attempts = 0;
    const maxAttempts = 3;
    let matchedPairs = 0;
    const totalPairs = cards.length; // Total de pares de tarjetas

    // Selector de corazones
    const hearts = document.querySelectorAll('.heart');
    let lives = hearts.length;

    cards.forEach(card => {
        card.addEventListener('click', selectCard);
    });

    words.forEach(word => {
        word.addEventListener('click', selectWord);
    });

    function selectWord() {
        words.forEach(word => {
            word.classList.remove('selected');
        });

        selectedWord = this;
        selectedWord.classList.add('selected');

        if (selectedCard) {
            const word = selectedWord.dataset.word;
            const cardWord = selectedCard.dataset.word;
            if (word === cardWord) {
                correctMatch();
            } else {
                incorrectMatch();
            }
        }
    }

    function selectCard() {
        if (selectedCard) {
            selectedCard.classList.remove('selected');
        }

        selectedCard = this;
        selectedCard.classList.add('selected');

        if (selectedWord) {
            const word = selectedWord.dataset.word;
            const cardWord = selectedCard.dataset.word;
            if (word === cardWord) {
                correctMatch();
            } else {
                incorrectMatch();
            }
        }
    }

    function correctMatch() {
        playAudio(audioCorrecto);

        selectedCard.classList.add('correct');
        selectedWord.classList.add('correct');

        setTimeout(() => {
            selectedCard.classList.add('destroyed');
            selectedWord.classList.add('destroyed');
            selectedCard.classList.remove('selected', 'correct');
            selectedWord.classList.remove('selected', 'correct');
            selectedCard.removeEventListener('click', selectCard);

            selectedCard = null;
            selectedWord = null;
        }, 300);

        matchedPairs++;
        console.log('Número de parejas coincidentes:', matchedPairs); // Agregamos este mensaje de consola

        correctMessage.style.display = 'block';
        setTimeout(() => {
            correctMessage.style.display = 'none';
        }, 500);

        if (matchedPairs === totalPairs) {
            completedMessage.style.display = 'block';
            console.log('Mostrar flecha');
            showArrow(); // Llama a la función para mostrar la flecha
        }
    }

    function incorrectMatch() {
        playAudio(audioIncorrecto);

        selectedCard.classList.add('incorrect');
        selectedWord.classList.add('incorrect');

        setTimeout(() => {
            selectedCard.classList.remove('selected', 'incorrect');
            selectedWord.classList.remove('selected', 'incorrect');

            selectedCard = null;
            selectedWord = null;
        }, 300);

        attempts++;
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 500);

        lives--;
        if (lives >= 0) {
            animateHeartDisappearance(hearts[lives]);
        }

        if (attempts === maxAttempts) {
            setTimeout(() => {
                mostrarGameOver();
            }, 500);
        }
    }

    function mostrarGameOver() {
        modalGameOver.style.display = 'block';

        const reintentarBtn = document.getElementById('reintentarBtn');
        const salirBtn = document.getElementById('salirBtn');

        reintentarBtn.addEventListener('click', () => {
            modalGameOver.style.display = 'none';
            window.location.href = 'game4.html';
        });

        salirBtn.addEventListener('click', () => {
            modalGameOver.style.display = 'none';
            window.location.href = '../index.html';
        });

        audioGameOver.volume = 0.5;
        audioGameOver.play();
    }

    function animateHeartDisappearance(heart) {
        heart.style.transition = 'opacity 0.5s ease-out';
        heart.style.opacity = '0';
        setTimeout(() => {
            heart.style.display = 'none';
        }, 500);
    }

    var closeSVG = document.querySelector(".close-svg");

    function handleCloseClick() {
        window.location.href = "https://www.ejemplo.com";
    }

    function playAudio(audio) {
        audio.currentTime = 0;
        audio.play();
    }

    function showArrow() {
        const arrowIcon = document.getElementById('arrow-icon');
        const modal = document.getElementById("modal");
        modal.style.display="flex";
        modal.classList.add("show");
        arrowIcon.style.display = 'inline-block';
        arrowIcon.addEventListener('click', () => {
            window.location.href = '../final.html';
        });
        setTimeout(() => {
            modal.classList.remove("show");
            modal.classList.add("hide");
            setTimeout(() => {
                modal.style.display = "none";
                modal.classList.remove("hide");
            }, 500); 
        }, 1200); 
    }

    // Verifica el valor de totalPairs
    console.log('Total de pares de tarjetas:', totalPairs);
});