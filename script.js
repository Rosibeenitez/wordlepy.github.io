let palabraSecreta = "";
let intentos = 6;
let palabrasJugadas = [];

// Selección de elementos del DOM
const input = document.getElementById("guess-input");
const submitBtn = document.getElementById("submit-btn");
const gameBoard = document.getElementById("game-board");
const message = document.getElementById("message");

// Función para obtener una palabra aleatoria de la API Greenborn
async function obtenerPalabra() {
    try {
        const response = await fetch('https://clientes.api.greenborn.com.ar/public-random-word?c=1&l=5');
        const data = await response.json();
        palabraSecreta = data[0]; // La palabra viene en un array
        console.log("Palabra secreta:", palabraSecreta);
    } catch (error) {
        console.error("Error al obtener la palabra:", error);
        message.textContent = "Error al obtener la palabra. Intenta nuevamente.";
    }
}

// Función para validar la palabra ingresada
function validarPalabra(guess) {
    const fila = document.createElement("div");

    for (let i = 0; i < 5; i++) {
        const letra = document.createElement("div");
        letra.textContent = guess[i];
        letra.classList.add("letter-box");

        if (guess[i] === palabraSecreta[i]) {
            letra.classList.add("correct");
        } else if (palabraSecreta.includes(guess[i])) {
            letra.classList.add("misplaced");
        } else {
            letra.classList.add("wrong");
        }

        fila.appendChild(letra);
    }

    gameBoard.appendChild(fila);

    if (guess === palabraSecreta) {
        message.textContent = "¡Felicidades! Adivinaste la palabra.";
        submitBtn.disabled = true;
    } else {
        intentos--;
        message.textContent = `Te quedan ${intentos} intentos.`;

        if (intentos === 0) {
            message.textContent = `Perdiste. La palabra correcta era: ${palabraSecreta}`;
            submitBtn.disabled = true;
        }
    }

    input.value = "";
}

// Evento para el botón de enviar
submitBtn.addEventListener("click", () => {
    const guess = input.value.toLowerCase();
    if (guess.length !== 5) {
        message.textContent = "Debes ingresar una palabra de 5 letras.";
        return;
    }

    validarPalabra(guess);
});

// Llamada inicial para obtener la palabra secreta
obtenerPalabra();
