/* Creamos una constante para el precio por dia del alquiler */
const hondaPrecio = 20;
const yamahaPrecio = 30;
const harleyPrecio = 50; // Corrigiendo Harley a un precio más realista

// Función para obtener la fecha actual en formato AAAA-MM-DD
function fechaActual() { 
    const fechaActual = new Date();
    const dia = fechaActual.getDate().toString().padStart(2, "0");
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, "0");
    const ano = fechaActual.getFullYear();
    return `${ano}-${mes}-${dia}`;
}

// Establece las fechas por defecto en los campos de recogida y entrega
document.getElementById("fechaRecogida").value = fechaActual();
document.getElementById("fechaEntrega").value = fechaActual();

// Función para calcular la diferencia en días entre dos fechas
function calcularDias(fechaInicio, fechaFin) {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    const diferencia = (fin - inicio) / (1000 * 60 * 60 * 24);
    return diferencia > 0 ? diferencia : 0; // Asegura que no haya días negativos
}

// Función para calcular el precio total del alquiler
function calculoPrecio() {
    // Obtener fechas de los campos del formulario
    const fechaRecogida = document.getElementById("fechaRecogida").value;
    const fechaEntrega = document.getElementById("fechaEntrega").value;

    // Calcular la diferencia en días
    const dias = calcularDias(fechaRecogida, fechaEntrega);

    // Determinar qué moto está seleccionada y su precio
    let precioPorDia = 0;
    if (document.getElementById("honda").checked) {
        precioPorDia = hondaPrecio;
    } else if (document.getElementById("yamaha").checked) {
        precioPorDia = yamahaPrecio;
    } else if (document.getElementById("harley").checked) {
        precioPorDia = harleyPrecio;
    }

    // Calcular el precio total
    const precioTotal = dias * precioPorDia;

    // Mostrar el resultado en pantalla
    const resultado = dias > 0 
        ? `Has seleccionado ${dias} día(s). El precio total es: $${precioTotal}`
        : "Por favor, selecciona un rango de fechas válido.";
    
    document.getElementById("test").innerText = resultado;
}