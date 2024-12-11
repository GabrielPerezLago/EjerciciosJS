/* Creamos una constante para el precio por dia del alquiler */
const hondaPrecio  = 20;
const yamahaPrecio = 30;
const harleyPrecio = 20;
function fechaActual(){ 
    const fechaActual = new Date();
    const dia = fechaActual.getDate().toString().padStart(2,"0");
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2,"0");
    const ano = fechaActual.getFullYear();

    return `${ano}-${mes}-${dia}`;
}


let inputFechaRecogida = new Date(document.getElementById("fechaRecogida"));
let inputFechaEntrega = new Date(document.getElementById("fechaEntrega"));

inputFechaRecogida.value = fechaActual();
inputFechaEntrega.value = fechaActual();

diferencia = function(){
    
    diff = (inputFechaEntrega.getTime() - inputFechaRecogida.getTime()) / (1000 * 60 * 60 * 24);

    document.getElementById("test").innerHTML = diff;
    
}

function calculoPrecio(){
    harley = document.formu.moto[0].checked;
    honda = document.formu.moto[1].checked;
    yamaha = document.formu.moto[2].checked;
    if (honda === true ){
        document.write("Funciona");
    }
   
}




