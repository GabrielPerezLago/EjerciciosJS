
    /* 
    ** La variable asign equivale a las Asignaturas.
    ** La variable alumn equivale a los Alumnos.
    */

function listadoDatos(){

    let asignaturas = document.getElementById("asignaturas").value;
    let alumnos = document.getElementById("alumnos").value;
    
    asignaturasArray = asignaturas.split(",").map(item => item.trim());
    alumnosArray = alumnos.split(",").map(item => item.trim());
    
    notasArray = [];

    alumnosArray.forEach(alumno => {
       notasAlumno = asignaturasArray.map(() => (() => Math.random() * 10));
        notasArray.push({alumno, notas : notasAlumno});
    });
    
    
    return asignaturasArray, alumnosArray, notasArray;
}

function printTabla(){
    let fila;
    for(i=0; i<2; i++){
        fila = document.createElement("th");

        for(j=0; j<2; j++){
         
        }
    }
    
}



