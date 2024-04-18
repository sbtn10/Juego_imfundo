let clicado = false;
var flechaSound = document.getElementById('flechaSound');

document.getElementById('flecha').addEventListener('click', function() {
    flechaSound.currentTime = 0;
    flechaSound.volume=0.1;
    flechaSound.play();
})

// Función para manejar el redireccionamiento de los botones del primer conjunto
function handleFirstSet(event) {
    const modulo = event.target.id.slice(-1); // Obtener el número de módulo del id del botón
    const moduloEnlace = clicado ? parseInt(modulo) + 6 : parseInt(modulo); // Ajustar el número de módulo en función de si la flecha está clicada o no
    window.location.href = `./modulo${moduloEnlace}/modulo${moduloEnlace}.html`; // Redirigir al módulo correspondiente
}

// Función para manejar el redireccionamiento de los botones del segundo conjunto
function handleSecondSet(event) {
    const modulo = event.target.id.slice(-1); // Obtener el número de módulo del id del botón
    const moduloEnlace = clicado ? parseInt(modulo) + 6 : parseInt(modulo) + 1; // Ajustar el número de módulo en función de si la flecha está clicada o no
    window.location.href = `./modulo${moduloEnlace}/modulo${moduloEnlace}.html`; // Redirigir al módulo correspondiente
}

// Agregar event listeners a los botones del primer conjunto
document.getElementById('btn1').addEventListener('click', handleFirstSet);
document.getElementById('btn2').addEventListener('click', handleFirstSet);
document.getElementById('btn3').addEventListener('click', handleFirstSet);
document.getElementById('btn4').addEventListener('click', handleFirstSet);
document.getElementById('btn5').addEventListener('click', handleFirstSet);
document.getElementById('btn6').addEventListener('click', handleFirstSet);

// Agregar event listener a la flecha para alternar entre conjuntos de botones
document.getElementById('flecha').addEventListener('click', function() {
    if (!clicado) {
        // Cambiar la apariencia de los botones y la flecha
        document.getElementById('btn1').textContent = 'MODULO 7';
        document.getElementById('btn2').textContent = 'MODULO 8';
        document.getElementById('btn3').textContent = 'MODULO 9';
        document.getElementById('btn4').textContent = 'MODULO 10';
        document.getElementById('btn5').textContent = 'MODULO 11';
        document.getElementById('btn6').textContent = 'MODULO 12';

        document.getElementById('flecha').style.transform = 'rotate(180deg)';
    } else {
        // Restaurar la apariencia original de los botones y la flecha
        document.getElementById('btn1').textContent = 'MODULO 1';
        document.getElementById('btn2').textContent = 'MODULO 2';
        document.getElementById('btn3').textContent = 'MODULO 3';
        document.getElementById('btn4').textContent = 'MODULO 4';
        document.getElementById('btn5').textContent = 'MODULO 5';
        document.getElementById('btn6').textContent = 'MODULO 6';

        document.getElementById('flecha').style.transform = 'rotate(0deg)';
    }
    clicado = !clicado;
});

function reproducirSonidoHover() {
    var sonidoHover = document.getElementById('hoverSound');
    sonidoHover.volume=0.1;
    sonidoHover.currentTime = 0; // Reinicia el sonido para reproducirlo desde el principio
    sonidoHover.play();
}

document.getElementById('btn1').addEventListener('mouseover', reproducirSonidoHover);
document.getElementById('btn2').addEventListener('mouseover', reproducirSonidoHover);
document.getElementById('btn3').addEventListener('mouseover', reproducirSonidoHover);
document.getElementById('btn4').addEventListener('mouseover', reproducirSonidoHover);
document.getElementById('btn5').addEventListener('mouseover', reproducirSonidoHover);
document.getElementById('btn6').addEventListener('mouseover', reproducirSonidoHover);

var audio = document.getElementById('audioElement');
        audio.volume = 0.3;