/**
 * Genera y descarga un archivo CSV con el contenido de la tabla.
 */
function exportarTablaCSV() {
    // Seleccionamos la tabla que queremos exportar
    const tabla = document.querySelector('#resultado table');
  
    // Si la tabla no existe, mostramos una alerta y detenemos la ejecución
    if (!tabla) {
      alert('No se encontró la tabla para exportar.');
      return;
    }
  
    // Inicializamos una cadena vacía para almacenar el contenido del CSV
    let csvContent = '';
  
    // Extraemos los encabezados (<th>) de la tabla y los agregamos como la primera línea del CSV
    tabla.querySelectorAll('thead th').forEach(th => csvContent += th.textContent.trim() + ',');
    
    // Eliminamos la última coma y añadimos un salto de línea para separar las cabeceras de los datos
    csvContent = csvContent.slice(0, -1) + '\n';
  
    // Extraemos las filas de datos (<td>) y las agregamos al contenido del CSV
    tabla.querySelectorAll('tbody tr').forEach(tr => {
      tr.querySelectorAll('td').forEach(td => csvContent += td.textContent.trim() + ',');
      
      // Eliminamos la última coma de cada fila y añadimos un salto de línea
      csvContent = csvContent.slice(0, -1) + '\n';
    });
  
    // Creamos un archivo Blob con el contenido CSV, estableciendo su tipo de datos
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
    // Creamos un enlace `<a>` temporal para forzar la descarga del archivo
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob); // Creamos una URL a partir del Blob
    link.setAttribute('download', 'tabla_productos_categorias.csv'); // Nombre del archivo
  
    // Agregamos el enlace al documento, lo simulamos haciendo clic y luego lo eliminamos
    document.body.appendChild(link);
    link.click(); // Simulamos un clic para iniciar la descarga
    document.body.removeChild(link); // Eliminamos el enlace después de la descarga
  }
  