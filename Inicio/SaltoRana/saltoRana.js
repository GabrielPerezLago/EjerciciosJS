/* document.getElementById("imagen").src = "./img/rana.jpg" */
/* brincoRana = setInterval(saltoRana(), 1000);
 */
const rana = document.getElementById("imagen");
regalo = document.getElementById("regalo");
regalo.src = "./img/regalo.jpeg";
let contador = 0;
function saltoRana(){
    
    x = Math.floor(Math.random() * (window.innerWidth - rana.width));
    y = Math.floor(Math.random() * (window.innerHeight - rana.height));

    rana.style.top = y + "px";
    rana.style.left = x + "px";
    rana.width *= 0.9;
    rana.height *= 0.9; 
    
    setInterval(saltoRana,3000);
};

function contarClicks(){
    saltoRana();
    contador++;
    document.getElementById("contador").innerHTML = "Nª de clicks: " + contador;
    if (contador === 20){
        alert("Limite de clicks alcanzado");
        
    }
    
}



function regaloAleatorio(){
    x = Math.floor(Math.random() * (window.innerWidth))
}

rana.addEventListener("click", contarClicks);

