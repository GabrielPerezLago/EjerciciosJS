/**
 * Genera y descarga un archivo PDF con el contenido de la tabla en un formato estructurado.
 */
function exportarTablaPDF() {
    // Seleccionamos la tabla que queremos exportar
    const tabla = document.querySelector('#resultado table');
  
    // Si la tabla no existe, mostramos una alerta y detenemos la ejecución
    if (!tabla) {
      alert('No se encontró la tabla para exportar.');
      return;
    }
  
    // Importamos la clase jsPDF desde la biblioteca cargada en index.html
    const { jsPDF } = window.jspdf;
  
    // Creamos una nueva instancia de jsPDF con configuración específica
    const doc = new jsPDF({
      orientation: 'p', // 'p' -> orientación vertical, 'l' -> orientación horizontal
      unit: 'pt', // Unidades en puntos (pt)
      format: 'A4' // Tamaño del documento A4
    });
  
    // Definimos el tamaño de fuente y añadimos un título al documento
    doc.setFontSize(16);
    doc.text('Listado de Productos y Categorías', 40, 40);
  
    // Creamos arreglos para almacenar los encabezados y los datos de la tabla
    const headers = [];
    const filas = [];
  
    // Extraemos los encabezados (<th>) de la tabla y los almacenamos en `headers`
    tabla.querySelectorAll('thead th').forEach(th => headers.push(th.textContent.trim()));
  
    // Extraemos las filas de datos (<td>) y las almacenamos en `filas`
    tabla.querySelectorAll('tbody tr').forEach(tr => {
      const fila = [];
      tr.querySelectorAll('td').forEach(td => fila.push(td.textContent.trim()));
      filas.push(fila); // Agregamos la fila completa al array de datos
    });
  
    // Generamos la tabla en el PDF usando la librería `jspdf-autotable`
    doc.autoTable({
      head: [headers], // Agregamos los encabezados
      body: filas, // Agregamos las filas de datos
      startY: 60, // Posición de inicio de la tabla en el PDF
      theme: 'grid', // Estilo de la tabla ('striped', 'grid', 'plain')
      styles: {
        font: 'helvetica', // Fuente utilizada
        fontSize: 10, // Tamaño de fuente de los datos
        cellPadding: 5 // Espaciado interno en las celdas
      },
      headStyles: {
        fillColor: [44, 62, 80], // Color de fondo para los encabezados (gris oscuro)
        textColor: [255, 255, 255], // Color del texto de los encabezados (blanco)
        fontStyle: 'bold' // Fuente en negrita para los encabezados
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240] // Color de fondo alternativo para las filas (gris claro)
      },
      margin: { top: 60, bottom: 20 } // Márgenes del documento
    });
  
    // Guardamos el PDF y lo descargamos con el nombre especificado
    doc.save('tabla_productos_categorias.pdf');
  }
  