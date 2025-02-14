onmessage = function(evento) {
    if (evento.data === 'INICIAR') {
      // Otro cálculo intensivo 
      const resultado = calcularIntensivoB();
  
      // Retornamos el resultado al hilo principal
      postMessage(resultado);
    }
  };
  
  /**
   * Simula otro cálculo intensivo (Fibonacci con un número grande).
   * Esto puede tardar varios segundos igualmente.
   */
  function calcularIntensivoB() {
    const n = 43; 
    const valorFib = fibonacci(n);
    return `Worker B calculó Fibonacci(${n}) = ${valorFib}`;
  }
  
  /**
   * Fibonacci naive recursivo
   * (n grande -> tardará varios segundos)
   */
  function fibonacci(n) {
    if (n <= 1) {
      return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
  