/**
 * Maneja la carga de un archivo CSV local y lo procesa para mostrarlo en la tabla.
 */
function cargarArchivoCSV(event) {
    // Obtenemos el archivo seleccionado por el usuario
    const archivo = event.target.files[0];
  
    // Verificamos si se ha seleccionado un archivo
    if (!archivo) {
      alert('Por favor, selecciona un archivo CSV.');
      return;
    }
  
    // Creamos un lector de archivos
    const lector = new FileReader();
  
    // Evento que se ejecuta cuando el archivo ha sido leído completamente
    lector.onload = function (e) {
      const contenidoCSV = e.target.result; // Contenido del archivo en formato texto
      const datos = procesarCSV(contenidoCSV); // Convertimos el CSV a un array de objetos
      renderizarTabla(datos); // Renderizamos la tabla con los datos obtenidos
    };
  
    // Leemos el contenido del archivo como texto
    lector.readAsText(archivo);
  }
  
  /**
   * Convierte una cadena CSV en un array de objetos con la estructura:
   * { producto: "Nombre del producto", categoria: "Nombre de la categoría" }
   * @param {string} textoCSV - Contenido del archivo CSV en formato string
   * @returns {Array<Object>} - Array de objetos con los datos procesados
   */
  function procesarCSV(textoCSV) {
    // Dividimos el texto en líneas (cada línea es una fila del CSV)
    const lineas = textoCSV.split('\n');
  
    // Extraemos las cabeceras del CSV (primer línea)
    const cabeceras = lineas[0].split(',').map(cabecera => cabecera.trim());
  
    // Creamos un array donde guardaremos los objetos procesados
    const datos = [];
  
    // Procesamos cada línea (desde la segunda, ya que la primera es la cabecera)
    for (let i = 1; i < lineas.length; i++) {
      const valores = lineas[i].split(',').map(valor => valor.trim());
  
      // Evitamos procesar líneas vacías
      if (valores.length === cabeceras.length && valores[0] !== '') {
        datos.push({
          producto: valores[0], // Primera columna = Producto
          categoria: valores[1]  // Segunda columna = Categoría
        });
      }
    }
  
    return datos; // Retornamos el array de objetos con los datos procesados
  }
  
  // Asignamos el evento de carga al botón de selección de archivos
  document.getElementById('btnCargarCSV')?.addEventListener('change', cargarArchivoCSV);
  