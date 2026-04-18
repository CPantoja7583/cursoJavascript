// ============================================================
// Evaluación Final Módulo 4
// Clase que administra la data del endpoint de usuarios
// ============================================================

class AdministradorUsuarios {

    constructor() {
        this.usuarios = [];

        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://jsonplaceholder.typicode.com/users", true);

        xhr.onload = () => {
            if (xhr.status === 200) {
                this.usuarios = JSON.parse(xhr.responseText);
                console.log("✔ Datos cargados: " + this.usuarios.length + " usuarios.");
                mostrarEnPagina("Datos cargados correctamente. ¡Ya puedes usar los botones!", "ok");
            } else {
                console.error("Error HTTP: " + xhr.status);
                mostrarEnPagina("Error al cargar los datos (HTTP " + xhr.status + ").", "err");
            }
        };

        xhr.onerror = () => {
            console.error("Error de red al obtener los datos.");
            mostrarEnPagina("Error de red. Verifica tu conexión.", "err");
        };

        xhr.send();
    }

    // ── Helper: buscar usuario por nombre ──────────────────────
    _buscarPorNombre(nombre) {
        return this.usuarios.find(
            u => u.name.toLowerCase() === nombre.trim().toLowerCase()
        );
    }

    // ── Helper: verificar que los datos estén cargados ─────────
    _datosListos() {
        if (this.usuarios.length === 0) {
            const msg = "Los datos aún no han sido cargados. Espera un momento e intenta de nuevo.";
            console.warn(msg);
            mostrarEnPagina(msg, "warn");
            return false;
        }
        return true;
    }

    // ── Helper: pedir nombre por prompt ────────────────────────
    _pedirNombre() {
        const nombre = prompt("Ingrese el nombre completo del usuario:");
        if (!nombre || nombre.trim() === "") return null;
        return nombre.trim();
    }

    // ── 1. Listar nombres de todos los usuarios ─────────────────
    listarNombres() {
        if (!this._datosListos()) return;

        console.log("=== Nombres de todos los usuarios ===");
        let salida = "<strong>Nombres de todos los usuarios:</strong><ol>";

        this.usuarios.forEach(u => {
            console.log("• " + u.name);
            salida += "<li>" + u.name + "</li>";
        });

        salida += "</ol>";
        mostrarEnPagina(salida);
    }

    // ── 2. Información básica (username y email) ────────────────
    mostrarInfoBasica() {
        if (!this._datosListos()) return;

        const nombre = this._pedirNombre();
        if (!nombre) return;

        const u = this._buscarPorNombre(nombre);
        if (!u) {
            const msg = 'Usuario "' + nombre + '" no encontrado.';
            console.warn(msg);
            mostrarEnPagina(msg, "err");
            return;
        }

        console.log("=== Información básica de " + u.name + " ===");
        console.log("Username : " + u.username);
        console.log("Email    : " + u.email);

        mostrarEnPagina(
            "<strong>Información básica de " + u.name + ":</strong>" +
            "<ul>" +
            "<li><b>Username:</b> " + u.username + "</li>" +
            "<li><b>Email:</b> " + u.email + "</li>" +
            "</ul>"
        );
    }

    // ── 3. Dirección (todos los campos) ────────────────────────
    mostrarDireccion() {
        if (!this._datosListos()) return;

        const nombre = this._pedirNombre();
        if (!nombre) return;

        const u = this._buscarPorNombre(nombre);
        if (!u) {
            const msg = 'Usuario "' + nombre + '" no encontrado.';
            console.warn(msg);
            mostrarEnPagina(msg, "err");
            return;
        }

        const d = u.address;
        console.log("=== Dirección de " + u.name + " ===");
        console.log("Calle    : " + d.street);
        console.log("Suite    : " + d.suite);
        console.log("Ciudad   : " + d.city);
        console.log("ZIP      : " + d.zipcode);
        console.log("Geo Lat  : " + d.geo.lat);
        console.log("Geo Lng  : " + d.geo.lng);

        mostrarEnPagina(
            "<strong>Dirección de " + u.name + ":</strong>" +
            "<ul>" +
            "<li><b>Calle:</b> " + d.street + "</li>" +
            "<li><b>Suite:</b> " + d.suite + "</li>" +
            "<li><b>Ciudad:</b> " + d.city + "</li>" +
            "<li><b>ZIP:</b> " + d.zipcode + "</li>" +
            "<li><b>Geo:</b> Lat " + d.geo.lat + " / Lng " + d.geo.lng + "</li>" +
            "</ul>"
        );
    }

    // ── 4. Información avanzada (teléfono, web, compañía) ───────
    mostrarInfoAvanzada() {
        if (!this._datosListos()) return;

        const nombre = this._pedirNombre();
        if (!nombre) return;

        const u = this._buscarPorNombre(nombre);
        if (!u) {
            const msg = 'Usuario "' + nombre + '" no encontrado.';
            console.warn(msg);
            mostrarEnPagina(msg, "err");
            return;
        }

        const c = u.company;
        console.log("=== Información avanzada de " + u.name + " ===");
        console.log("Teléfono    : " + u.phone);
        console.log("Sitio web   : " + u.website);
        console.log("Compañía    : " + c.name);
        console.log("Catchphrase : " + c.catchPhrase);
        console.log("BS          : " + c.bs);

        mostrarEnPagina(
            "<strong>Información avanzada de " + u.name + ":</strong>" +
            "<ul>" +
            "<li><b>Teléfono:</b> " + u.phone + "</li>" +
            "<li><b>Sitio web:</b> " + u.website + "</li>" +
            "<li><b>Compañía:</b> " + c.name + "</li>" +
            "<li><b>Catchphrase:</b> " + c.catchPhrase + "</li>" +
            "<li><b>BS:</b> " + c.bs + "</li>" +
            "</ul>"
        );
    }

    // ── 5. Todas las compañías con su catchphrase ───────────────
    listarCompanias() {
        if (!this._datosListos()) return;

        console.log("=== Compañías y frases clave ===");
        let salida = "<strong>Compañías y frases clave:</strong><ol>";

        this.usuarios.forEach(u => {
            console.log("• " + u.company.name + " → " + u.company.catchPhrase);
            salida += "<li><b>" + u.company.name + "</b>: " + u.company.catchPhrase + "</li>";
        });

        salida += "</ol>";
        mostrarEnPagina(salida);
    }

    // ── 6. Nombres ordenados alfabéticamente ────────────────────
    listarNombresOrdenados() {
        if (!this._datosListos()) return;

        const ordenados = this.usuarios.map(u => u.name).sort();

        console.log("=== Nombres ordenados alfabéticamente ===");
        let salida = "<strong>Nombres ordenados alfabéticamente:</strong><ol>";

        ordenados.forEach(n => {
            console.log("• " + n);
            salida += "<li>" + n + "</li>";
        });

        salida += "</ol>";
        mostrarEnPagina(salida);
    }
}

// ── Función auxiliar para mostrar resultados en la página ──────
function mostrarEnPagina(html, tipo) {
    const div = document.getElementById("resultado");
    div.innerHTML = html;
    div.className = "resultado " + (tipo || "ok");
}

// ── Instancia global ────────────────────────────────────────────
const admin = new AdministradorUsuarios();
