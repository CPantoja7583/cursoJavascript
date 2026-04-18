// ============================================================
// Tarea 7 - Funciones Callback en JavaScript
// ============================================================

// ------------------------------------------------------------
// 1. validar_numero(callback)
//    Solicita un número al usuario y valida si es numérico.
//    Llama al callback indicando éxito o error.
// ------------------------------------------------------------
function validar_numero(callback) {
    let dato = prompt("Ingrese un número:");

    if (dato === null) {
        callback(false, "El usuario canceló la operación.");
        return;
    }

    if (dato.trim() === "") {
        callback(false, "No ingresó ningún valor.");
        return;
    }

    if (!isNaN(dato)) {
        callback(true, "El número " + dato + " es válido.");
    } else {
        callback(false, "Usted ingresó caracteres incorrectos: \"" + dato + "\"");
    }
}

// ------------------------------------------------------------
// 2. calcular_y_avisar_despues(numero, callback)
//    Calcula la sumatoria de números impares entre 1 y numero.
//    Después de 5 segundos ejecuta el callback con el resultado.
// ------------------------------------------------------------
function calcular_y_avisar_despues(numero, callback) {
    let sumatoria = 0;

    for (let i = 1; i <= numero; i++) {
        if (i % 2 !== 0) {
            sumatoria += i;
        }
    }

    setTimeout(() => {
        callback(sumatoria);
    }, 5000);
}

// ------------------------------------------------------------
// 3. calcular_y_avisar_dependiendo(numero, callback, callback_error)
//    Calcula las sumatorias sucesivas desde 1 hasta numero.
//    Ejemplo con numero = 5:
//      1 → 1+2 → 1+2+3 → 1+2+3+4 → 1+2+3+4+5  →  total = 35
//    Si resultado < 1000  → llama a callback
//    Si resultado >= 1000 → llama a callback_error
// ------------------------------------------------------------
function calcular_y_avisar_dependiendo(numero, callback, callback_error) {
    let total = 0;

    for (let i = 1; i <= numero; i++) {
        // Suma parcial: 1 + 2 + ... + i
        let sumaParcial = (i * (i + 1)) / 2;
        total += sumaParcial;
    }

    if (total < 1000) {
        callback(numero, total);
    } else {
        callback_error(numero, total);
    }
}
