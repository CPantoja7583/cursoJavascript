// Solicitar el diámetro al usuario
var diametro = prompt("Ingresa el diámetro del círculo:");

// Calcular el radio
var radio = diametro / 2;

// Calcular el área
var area = Math.PI * Math.pow(radio, 2);

// Mostrar en consola
console.log("El área del círculo es: " + area);

// Mostrar en alerta
window.alert("El área del círculo es: " + area);

// Mostrar en la página
document.getElementById("resultado").innerHTML = "El área del círculo es: " + area;
