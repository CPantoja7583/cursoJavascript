// ============================================================
// Tarea 8 - Manejo de Promesas en JavaScript
// ============================================================


// ── 1. Promesa con setTimeout ─────────────────────────────────
// Simula una petición a una base de datos que tarda 3 segundos.
// ─────────────────────────────────────────────────────────────
function promesaConTimeout() {
    console.log("Creando promesa");

    let promesa = new Promise((resolve, reject) => {
        console.log("Registrando promesa");

        setTimeout(() => {
            resolve({
                nombre:   "Mario",
                apellido: "Ross",
                edad:     55,
                lugar:    "Mushroom Kingdom"
            });
        }, 3000);
    });

    // Esta línea se ejecuta ANTES de que el setTimeout dispare,
    // porque el código síncrono continúa mientras se espera.
    console.log("Esperando respuesta");

    promesa
        .then(persona => {
            const msg = "Respuesta: " + JSON.stringify(persona, null, 2);
            console.log(msg);
            mostrarResultado(
                "<b>Promesa 1 - Resultado:</b><br>" +
                "Nombre: "   + persona.nombre   + "<br>" +
                "Apellido: " + persona.apellido + "<br>" +
                "Edad: "     + persona.edad     + "<br>" +
                "Lugar: "    + persona.lugar,
                "ok"
            );
        })
        .catch(error => console.error("Error:", error));
}


// ── 2. Promesa según segundos actuales ────────────────────────
// > 30 s: PAR → resolve | IMPAR → reject
// ≤ 30 s: IMPAR → resolve | PAR  → reject
// ─────────────────────────────────────────────────────────────
function promesaSegundos() {
    let promesa = new Promise((resolve, reject) => {
        const fecha    = new Date();
        const segundos = fecha.getSeconds();
        const hora     = fecha.toLocaleTimeString();
        const esPar    = segundos % 2 === 0;

        console.log("Segundos actuales: " + segundos + " (" + (esPar ? "PAR" : "IMPAR") + ")");

        if (segundos > 30) {
            if (esPar) {
                resolve("✔ Segundos > 30 y PAR → Hora actual: " + hora);
            } else {
                reject("✘ Segundos > 30 e IMPAR → Error generado.");
            }
        } else {
            if (!esPar) {
                resolve("✔ Segundos ≤ 30 e IMPAR → Hora actual: " + hora);
            } else {
                reject("✘ Segundos ≤ 30 y PAR → Error generado.");
            }
        }
    });

    promesa
        .then(msg => {
            console.log(msg);
            mostrarResultado("<b>Promesa 2 - Resolve:</b><br>" + msg, "ok");
        })
        .catch(err => {
            console.error(err);
            mostrarResultado("<b>Promesa 2 - Reject:</b><br>" + err, "err");
        });
}


// ── 3. Promesa con proceso pesado ─────────────────────────────
// El constructor de Promise es SÍNCRONO, por eso el bucle pesado
// bloquea el hilo principal (UI Thread) durante su ejecución.
// Los mensajes "antes" y "después del bucle" aparecen en orden,
// pero el navegador se congela hasta que el bucle termina porque
// JavaScript tiene un único hilo de ejecución (single-threaded).
// El .then() se ejecuta como microtarea, después del código
// síncrono actual pero antes del siguiente ciclo del event loop.
// ─────────────────────────────────────────────────────────────
function promesaProcesoPesado() {
    console.log("▶ Antes del proceso pesado");
    mostrarResultado("Ejecutando proceso pesado... el navegador puede congelarse.", "warn");

    // Usamos setTimeout(0) para que el mensaje en pantalla se
    // renderice antes de que el bucle bloquee el hilo.
    setTimeout(() => {
        let promesa = new Promise((resolve, reject) => {
            console.log("⚙ Iniciando proceso pesado...");

            // Bucle de 1.000 millones de iteraciones:
            // esto satura el CPU y bloquea el Event Loop.
            let suma = 0;
            for (let i = 0; i < 1e9; i++) {
                suma += i;
            }

            console.log("✔ Proceso pesado finalizado.");
            resolve(suma);
        });

        // Esta línea se ejecuta DESPUÉS del bucle porque el
        // constructor de Promise corre síncronamente.
        console.log("↩ Código síncrono continúa tras el constructor");

        promesa
            .then(resultado => {
                // El .then() es asíncrono (microtarea), se ejecuta
                // después de que termina el bloque síncrono actual.
                console.log("Resultado del proceso pesado: " + resultado);
                mostrarResultado(
                    "<b>Promesa 3 - Proceso pesado finalizado.</b><br>" +
                    "Suma acumulada: " + resultado +
                    "<br><small>Revisa la consola para ver el orden de los mensajes.</small>",
                    "ok"
                );
            })
            .catch(err => console.error("Error:", err));
    }, 50);
}


// ── Función auxiliar para mostrar resultados en la página ──────
function mostrarResultado(html, tipo) {
    const div = document.getElementById("resultado");
    div.innerHTML = html;
    div.className = "resultado " + (tipo || "ok");
}
