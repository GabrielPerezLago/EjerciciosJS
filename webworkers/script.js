/***********************************************
 * script.js
 * Hilo principal: gestiona el DOM e interactúa
 * con workerA.js y workerB.js
 ************************************************/

let workerA;
let workerB;

window.addEventListener('DOMContentLoaded', () => {
  // Crear instancias de los Workers
  workerA = new Worker('workerA.js');
  workerB = new Worker('workerB.js');

  // Configurar respuesta cuando Workers terminen
  configurarManejadoresDeMensajes();

  // Configurar los eventos del DOM
  configurarEventosDOM();
});

/**
 * Vinculamos el hilo principal a los mensajes de workerA y workerB.
 */
function configurarManejadoresDeMensajes() {
  // Lo que llega de Worker A
  workerA.onmessage = (evento) => {
    const resultado = evento.data;
    const resultadoA = document.getElementById('resultadoWorkerA');
    resultadoA.textContent = `Resultado Worker A: ${resultado}`;

    // Opcional: Actualizamos el estado si Worker B también terminó
    revisarEstadoCalculos();
  };

  // Lo que llega de Worker B
  workerB.onmessage = (evento) => {
    const resultado = evento.data;
    const resultadoB = document.getElementById('resultadoWorkerB');
    resultadoB.textContent = `Resultado Worker B: ${resultado}`;

    // Opcional: Actualizamos el estado si Worker A también terminó
    revisarEstadoCalculos();
  };
}

/**
 * Configura eventos de los botones en la interfaz.
 */
function configurarEventosDOM() {
  // Botón que inicia los cálculos intensivos
  const botonIniciarCalculos = document.getElementById('botonIniciarCalculos');
  botonIniciarCalculos.addEventListener('click', () => {
    iniciarCalculos();
  });

  // Botón que cambia de color la caja
  const botonCambiarColor = document.getElementById('botonCambiarColor');
  botonCambiarColor.addEventListener('click', () => {
    cambiarColorCaja();
  });
}

/**
 * Envía mensajes a los Workers para que empiecen sus cálculos.
 */
function iniciarCalculos() {
  // Indicamos en la interfaz que los cálculos han iniciado
  const estadoCalculos = document.getElementById('estadoCalculos');
  estadoCalculos.textContent = 'Estado: Ejecutando cálculos...';

  // Reiniciamos los resultados en la UI
  document.getElementById('resultadoWorkerA').textContent = 'Resultado Worker A: Calculando...';
  document.getElementById('resultadoWorkerB').textContent = 'Resultado Worker B: Calculando...';

  // Mensajes de inicio a cada Worker
  workerA.postMessage('INICIAR');
  workerB.postMessage('INICIAR');
}

/**
 * Chequea si ambos resultados están listos y actualiza el estado.
 */
function revisarEstadoCalculos() {
  const resultadoA = document.getElementById('resultadoWorkerA').textContent;
  const resultadoB = document.getElementById('resultadoWorkerB').textContent;

  if (!resultadoA.includes('Calculando') && !resultadoB.includes('Calculando')) {
    const estadoCalculos = document.getElementById('estadoCalculos');
    estadoCalculos.textContent = 'Estado: ¡Cálculos finalizados!';
  }
}

/**
 * Cambia el color de la caja de forma aleatoria.
 * Este proceso debe mantenerse fluido, incluso mientras los Workers calculan.
 */
function cambiarColorCaja() {
  const cajaColor = document.getElementById('cajaColor');
  // Generamos un color aleatorio en formato hexadecimal
  const colorAleatorio = '#' + Math.floor(Math.random() * 16777215).toString(16);
  cajaColor.style.backgroundColor = colorAleatorio;
}
