document.addEventListener('DOMContentLoaded', function () {
    const questions = document.querySelectorAll('.questions-container ol li');
    const modalNext = document.getElementById('modal');
    const audioElement = document.getElementById('audioElement');
    const flecha = document.querySelector('#arrow-icon');
    const audioCorrecto = new Audio('../audio/correcto.mp3');
    const audioIncorrecto = new Audio('../audio/incorrecto.mp3');
    const heartIcons = document.querySelectorAll('.heart');
    const gameOverModal = document.getElementById('gameOverModal');
    const reintentarBtn = document.getElementById('reintentarBtn');
    const salirBtn = document.getElementById('salirBtn');
    const profiles = [
        {
            id: "miranda",
            text: "Mi nombre es Miranda, soy casada y tengo 2 niños. Soy argentina, de Buenos Aires. Me gusta salir a pasear con mi familia al campo los fines de semana. Me gusta tejer chompas con diseños bonitos para los niños del albergue."
        },
        {
            id: "carlos",
            text: "Mi nombre es Carlos, tengo 28 años. Soy español, de la ciudad de Madrid. Me gusta jugar al fútbol, ir al gimnasio y salir con mis amigos. Cuando estoy de vacaciones me gusta viajar a lugares exóticos y misteriosos."
        },
        {
            id: "sofia",
            text: "Mi nombre es Sofía Mulanovich. Soy peruana. Me gusta correr tablas y me encanta competir en competencias internacionales de surfing. También, me gusta jugar al tenis como pasatiempo y escuchar música en mi tiempo libre."
        },
        {
            id: "gaston",
            text: "Mi nombre es Gastón Acurio, soy peruano. Como chef me gusta crear constantemente nuevas recetas y como peruano me gusta valorar el aporte de la cultura gastronómica regional a la cocina peruana."
        }
    ];

    const profileModal = document.getElementById('profileModal');
    const profileText = document.getElementById('profileText');
    const closeModal = document.getElementsByClassName('close')[0];

    profiles.forEach(profile => {
        const element = document.getElementById(profile.id);
        element.addEventListener("click", () => {
            profileText.textContent = profile.text;
            profileModal.style.display = 'block';
        });
    });

    closeModal.addEventListener('click', () => {
        profileModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === profileModal) {
            profileModal.style.display = 'none';
        }
    });

    let lives = 3;
    let currentQuestion = 0;

    function checkAnswer(selectedOption) {
        const correctAnswer = selectedOption.parentElement.querySelector('.correct');
        const selectedAnswer = selectedOption.textContent.trim();

        if (selectedAnswer === correctAnswer.textContent) {
            if (!audioCorrecto.paused) {
                audioCorrecto.currentTime = 0; // Reinicia el audio si aún está reproduciéndose
            }
            audioCorrecto.play();
            selectedOption.style.backgroundColor = 'green';
            currentQuestion++;
            // Desactivar todas las opciones después de responder correctamente
            const options = selectedOption.parentElement.querySelectorAll('button');
            options.forEach(option => {
                option.disabled = true;
                if (option.textContent.trim() === correctAnswer.textContent) {
                    option.classList.add('correct-answer');
                }
            });
            if (currentQuestion === questions.length) {
                flecha.style.display = 'block'; // Muestra la flecha al completar todo el juego
                modalNext.style.display = "flex";
                modalNext.classList.add("show");
                flecha.addEventListener('click', () => {
                    window.location.href = '../final.html';
                });
                setTimeout(() => {
                    modalNext.classList.remove("show");
                    modalNext.classList.add("hide");
                    setTimeout(() => {
                        modalNext.style.display = "none";
                        modalNext.classList.remove("hide");
                    }, 500);
                }, 1200);
            }
        } else {
            if (!audioIncorrecto.paused) {
                audioIncorrecto.currentTime = 0; // Reinicia el audio si aún está reproduciéndose
            }
            audioIncorrecto.play();
            selectedOption.style.backgroundColor = 'red';
            lives--;
            if (lives === 0) {
                gameOverModal.style.display = 'block';
            } else {
                heartIcons[lives].style.display = 'none';
            }
        }
    }

    questions.forEach(question => {
        const options = question.querySelectorAll('.options button');
        options.forEach(option => {
            option.addEventListener('click', function () {
                checkAnswer(option);
            });
        });
    });

    reintentarBtn.addEventListener('click', function () {
        window.location.reload();
    });

    salirBtn.addEventListener('click', function () {
        window.location.href = '../index.html';
    });

    // Control de audio
    const muteIcon = document.querySelector('#mute-icon');
    const soundIcon = document.querySelector('#sound-icon');
    const audio = document.querySelector('#audioElement');
    audio.volume = 0.03;
    let isMuted = false;

    soundIcon.addEventListener('click', toggleMute);
    muteIcon.addEventListener('click', toggleMute);

    function toggleMute() {
        audio.volume = isMuted ? 0.03 : 0;
        isMuted = !isMuted;
        soundIcon.style.display = isMuted ? 'none' : 'block';
        muteIcon.style.display = isMuted ? 'block' : 'none';
    }
});
