onmessage = function(evento) {
    if (evento.data === 'INICIAR') {
      // Llamamos a una función de cálculo que tarde algunos segundos
      const resultado = calcularIntensivoA();
  
      // Cuando termine, enviamos el resultado de vuelta
      postMessage(resultado);
    }
  };
  
  /**
   * Simula un cálculo intensivo 
   * Aquí haremos un "contador de primos" muy básico que, para rango grande,
   * tarda varios segundos en completarse.
   */
  function calcularIntensivoA() {
    const limite = 15000000; 
    let contadorPrimos = 0;
  
    for (let numero = 2; numero < limite; numero++) {
      if (esPrimo(numero)) {
        contadorPrimos++;
      }
    }
  
    return `Worker A encontró ${contadorPrimos} números primos por debajo de ${limite}`;
  }
  
  /**
   * Método naive para verificar si un número es primo.
   */
  function esPrimo(n) {
    if (n <= 1) return false;
    for (let i = 2; i * i <= n; i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  }
  