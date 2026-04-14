var cantidad = parseInt(prompt("¿Cuántas palabras deseas ingresar?"), 10);
var palabras = [];

for (var i = 0; i < cantidad; i++) {
    palabras.push(prompt("Ingresa la palabra " + (i + 1) + ":"));
}

var contarVocales = function (palabra) {
    var vocales = ["a", "e", "i", "o", "u"];
    var total = 0;
    var texto = palabra.toLowerCase();

    for (var i = 0; i < texto.length; i++) {
        if (vocales.includes(texto[i])) {
            total++;
        }
    }

    return total;
};

var textoCompleto = palabras.join("");
var totalVocales = contarVocales(textoCompleto);

console.log("Palabras ingresadas:", palabras);
console.log("Total de vocales:", totalVocales);

window.alert("Total de vocales: " + totalVocales);
document.getElementById("resultado").innerHTML = "Total de vocales: " + totalVocales;
