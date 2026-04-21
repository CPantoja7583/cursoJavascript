function repetir() {
  const palabra = document.getElementById("palabra").value;
  const veces = parseInt(document.getElementById("veces").value);
  const resultado = Array(veces).fill(palabra).join(" ");

  const div = document.getElementById("resultado-repetir");
  div.textContent = resultado;
  div.style.display = "block";
}

function aplicarColor() {
  const color = document.getElementById("color").value;
  document.getElementById("parrafo-color").style.backgroundColor = color;
}

function calcular() {
  const a = parseFloat(document.getElementById("num1").value);
  const b = parseFloat(document.getElementById("num2").value);

  const suma = a + b;
  const resta = a - b;
  const multiplicacion = a * b;
  const division = a / b;
  const totalResultados = suma + resta + multiplicacion + division;

  const div = document.getElementById("resultado-calcular");
  div.innerHTML = `
    <p>${a} + ${b} = ${suma}</p>
    <p>${a} - ${b} = ${resta}</p>
    <p>${a} * ${b} = ${multiplicacion}</p>
    <p>${a} / ${b} = ${division}</p>
    <p><strong>La suma de los resultados es ${totalResultados}</strong></p>
  `;
  div.style.display = "block";
}

function invertir() {
  const texto = document.getElementById("texto").value;
  const invertido = texto.split("").reverse().join("");

  const div = document.getElementById("resultado-invertir");
  div.textContent = invertido;
  div.style.display = "block";
}
