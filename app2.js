// Solicitar los tres números al usuario
var numeros = [];

numeros.push(parseFloat(prompt("Ingresa el primer número:")));
numeros.push(parseFloat(prompt("Ingresa el segundo número:")));
numeros.push(parseFloat(prompt("Ingresa el tercer número:")));

// Ordenamiento burbuja con ciclo do-while
var intercambio;
do {
    intercambio = false;
    for (var i = 0; i < numeros.length - 1; i++) {
        if (numeros[i] > numeros[i + 1]) {
            var temp = numeros[i];
            numeros[i] = numeros[i + 1];
            numeros[i + 1] = temp;
            intercambio = true;
        }
    }
} while (intercambio);

// Determinar el mayor y el menor
var menor = numeros[0];
var mayor = numeros[numeros.length - 1];

// Mostrar el resultado
if (menor === mayor) {
    document.write("Los tres números ingresados son idénticos: " + menor);
    alert("Los tres números ingresados son idénticos: " + menor);
} else {
    document.write("El número mayor es: " + mayor + "<br>El número menor es: " + menor);
    alert("El número mayor es: " + mayor + "\nEl número menor es: " + menor);
}
