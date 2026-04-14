var secreto = Math.floor(Math.random() * 10) + 1;
var usados = [];
var intentos = 3;

function yaUsado(numero, lista) {
    return lista.includes(numero);
}

while (intentos > 0) {
    var entrada = parseInt(prompt("Adivina el número del 1 al 10:"), 10);

    if (isNaN(entrada) || entrada < 1 || entrada > 10) {
        alert("Debes ingresar un número entre 1 y 10.");
        continue;
    }

    if (yaUsado(entrada, usados)) {
        alert("Ese número ya fue usado. Intenta con otro.");
        continue;
    }

    usados.push(entrada);
    document.getElementById("historial").innerHTML = "Intentos: " + usados.join(", ");
    console.log("Intento:", entrada);

    if (entrada === secreto) {
        alert("¡Adivinaste!");
        break;
    }

    intentos--;

    if (intentos > 0) {
        alert("No acertaste. Te quedan " + intentos + " intentos.");
    } else {
        alert("Sin aciertos. El número era: " + secreto);
    }
}
