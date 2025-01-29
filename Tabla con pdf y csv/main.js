/******************************************************
 * Variables globales y flags de ordenación
 ******************************************************/

// Array donde se almacenarán los datos combinados (productos y categorías)
let datosCombinados = [];        

// Estado de ordenación para la columna "Producto" (true = ascendente, false = descendente)
let estadoOrdenProducto = true;  

// Estado de ordenación para la columna "Categoría" (true = ascendente, false = descendente)
let estadoOrdenCategoria = true; 

/******************************************************
 * Carga inicial y configuración de botones
 ******************************************************/

// Esperamos a que el DOM esté completamente cargado antes de ejecutar el código
window.addEventListener('DOMContentLoaded', () => {
  cargarDatos(); // Llamamos a la función para cargar los datos de productos y categorías

  // Configurar el botón "Exportar a PDF" (si existe en el HTML)
  document.getElementById('btnExportar')?.addEventListener('click', exportarTablaPDF);

  // Configurar el botón "Exportar a CSV" (si existe en el HTML)
  document.getElementById('btnExportarCSV')?.addEventListener('click', exportarTablaCSV);
});

/******************************************************
 * Funciones de carga y combinación de datos
 ******************************************************/

/**
 * Carga los datos de productos desde un JSON y las categorías desde un XML,
 * los combina y luego renderiza la tabla en pantalla.
 */
function cargarDatos() {
  let listaProductos = []; // Array para almacenar los productos obtenidos del JSON
  let docXML = null; // Variable donde se almacenará el XML parseado

  // 1. Hacemos una petición para obtener los productos desde 'productos.json'
  fetch('productos.json')
    .then(response => response.ok ? response.json() : Promise.reject('Error JSON')) // Convertimos la respuesta a JSON si es válida
    .then(productos => {
      listaProductos = productos; // Guardamos la lista de productos
      return fetch('categorias.xml'); // 2. Realizamos una petición para obtener las categorías en XML
    })
    .then(responseXML => responseXML.ok ? responseXML.text() : Promise.reject('Error XML')) // Convertimos la respuesta en texto si es válida
    .then(textoXML => {
      // 3. Parseamos el XML a un documento manipulable
      const parser = new DOMParser();
      docXML = parser.parseFromString(textoXML, 'application/xml');

      // 4. Combinamos los datos de productos y categorías en un solo array
      datosCombinados = combinarDatos(listaProductos, docXML);

      // 5. Renderizamos la tabla con los datos combinados
      renderizarTabla(datosCombinados);
    })
    .catch(error => console.error('Error al cargar datos:', error)); // Capturamos y mostramos cualquier error
}

/**
 * Combina los productos obtenidos del JSON con las categorías del XML
 * y devuelve un array de objetos con la estructura:
 * { producto: "Nombre del producto", categoria: "Nombre de la categoría" }
 */
function combinarDatos(productos, xmlDoc) {
  return productos.map(producto => {
    // Buscamos en el XML la categoría correspondiente al producto actual
    const categoriaNodo = xmlDoc.querySelector(`categoria[id="${producto.categoriaId}"]`);

    // Si encontramos la categoría en el XML, obtenemos su nombre; si no, asignamos "Categoría desconocida"
    let nombreCategoria = categoriaNodo ? categoriaNodo.querySelector('nombre')?.textContent || 'Categoría desconocida' : 'Categoría desconocida';

    // Retornamos un objeto con el producto y su categoría asociada
    return { producto: producto.nombre, categoria: nombreCategoria };
  });
}

/******************************************************
 * Función para generar la tabla en el DOM
 ******************************************************/

/**
 * Crea dinámicamente una tabla en el contenedor #resultado con los datos proporcionados.
 */
function renderizarTabla(data) {
  // Seleccionamos el contenedor donde se insertará la tabla
  const contenedor = document.getElementById('resultado');
  contenedor.innerHTML = ''; // Limpiamos el contenido previo

  // Creamos la tabla
  const tabla = document.createElement('table');

  // Creamos la cabecera de la tabla
  const thead = document.createElement('thead');
  const trHead = document.createElement('tr'); // Fila de encabezados

  // Creamos el encabezado "Producto" y le añadimos la funcionalidad de ordenación
  const thProducto = document.createElement('th');
  thProducto.textContent = 'Producto';
  thProducto.addEventListener('click', () => {
    estadoOrdenProducto = ordenarPorCampo('producto', estadoOrdenProducto);
  });
  trHead.appendChild(thProducto); // Agregamos la columna "Producto" al encabezado

  // Creamos el encabezado "Categoría" y le añadimos la funcionalidad de ordenación
  const thCategoria = document.createElement('th');
  thCategoria.textContent = 'Categoría';
  thCategoria.addEventListener('click', () => {
    estadoOrdenCategoria = ordenarPorCampo('categoria', estadoOrdenCategoria);
  });
  trHead.appendChild(thCategoria); // Agregamos la columna "Categoría" al encabezado

  thead.appendChild(trHead); // Agregamos la fila de encabezado a la cabecera de la tabla
  tabla.appendChild(thead); // Insertamos la cabecera en la tabla

  // Creamos el cuerpo de la tabla
  const tbody = document.createElement('tbody');

  // Iteramos sobre los datos para generar las filas de la tabla
  data.forEach(item => {
    const tr = document.createElement('tr'); // Creamos una fila

    // Creamos la celda para el producto y la agregamos a la fila
    const tdProducto = document.createElement('td');
    tdProducto.textContent = item.producto;
    tr.appendChild(tdProducto);

    // Creamos la celda para la categoría y la agregamos a la fila
    const tdCategoria = document.createElement('td');
    tdCategoria.textContent = item.categoria;
    tr.appendChild(tdCategoria);

    tbody.appendChild(tr); // Añadimos la fila al cuerpo de la tabla
  });

  tabla.appendChild(tbody); // Insertamos el tbody en la tabla
  contenedor.appendChild(tabla); // Insertamos la tabla en el contenedor del HTML
}

/******************************************************
 * Función genérica para la ordenación de columnas
 ******************************************************/

/**
 * Ordena los datos de la tabla por el campo especificado (ascendente o descendente).
 * @param {string} campo - El campo por el cual se va a ordenar ("producto" o "categoria").
 * @param {boolean} estadoOrden - Estado actual de ordenación (true = ascendente, false = descendente).
 * @returns {boolean} - Nuevo estado de ordenación (invertido).
 */
function ordenarPorCampo(campo, estadoOrden) {
  // Ordenamos los datos según el estado actual
  datosCombinados.sort((a, b) => estadoOrden ? a[campo].localeCompare(b[campo]) : b[campo].localeCompare(a[campo]));

  // Volvemos a renderizar la tabla con los datos ya ordenados
  renderizarTabla(datosCombinados);

  // Devolvemos el estado de orden invertido para la próxima ordenación
  return !estadoOrden;
}
