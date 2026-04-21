// ============================================================
// Tarea 11 — Clase GhibliAPI
// Encapsula el consumo del endpoint de Studio Ghibli.
// Métodos async con caché local, console.table() y render HTML.
// ============================================================

class GhibliAPI {

  constructor(baseUrl = "https://ghibliapi.fly.dev/films") {
    this.baseUrl = baseUrl;
    this.cache = null;
  }

  // ── Fetch con caché ────────────────────────────────────────

  async getFilms() {
    if (this.cache) {
      _badge("desde caché local");
      return this.cache;
    }
    const res = await fetch(this.baseUrl);
    if (!res.ok) throw new Error(`Error al obtener films (HTTP ${res.status})`);
    this.cache = await res.json();
    return this.cache;
  }

  // ── 1. Títulos y Directores ────────────────────────────────

  async listarTitulosYDirectores() {
    try {
      const films = await this.getFilms();

      console.table(films.map(f => ({ Título: f.title, Director: f.director })));

      const filas = films.map(f => `
        <tr>
          <td>${f.title}</td>
          <td>${f.director}</td>
        </tr>
      `).join("");

      _mostrar(`
        <h2>1. Títulos y Directores</h2>
        <table>
          <thead><tr><th>Título</th><th>Director</th></tr></thead>
          <tbody>${filas}</tbody>
        </table>
      `);
    } catch (e) {
      _mostrar(e.message, "error");
      console.error(e);
    }
  }

  // ── 2. Títulos y Año ───────────────────────────────────────

  async listarTitulosYAnio() {
    try {
      const films = await this.getFilms();

      console.table(films.map(f => ({ Título: f.title, Año: f.release_date })));

      const filas = films.map(f => `
        <tr>
          <td>${f.title}</td>
          <td>${f.release_date}</td>
        </tr>
      `).join("");

      _mostrar(`
        <h2>2. Títulos y Año de lanzamiento</h2>
        <table>
          <thead><tr><th>Título</th><th>Año</th></tr></thead>
          <tbody>${filas}</tbody>
        </table>
      `);
    } catch (e) {
      _mostrar(e.message, "error");
      console.error(e);
    }
  }

  // ── 3. Filtrar por Año ─────────────────────────────────────

  async filtrarPorAnio() {
    const input = prompt("Ingrese un año (YYYY):");
    const anio = parseInt(input, 10);

    if (Number.isNaN(anio)) {
      _mostrar("Año inválido. Ingrese un número como 1988.", "warn");
      console.warn("Año inválido:", input);
      return;
    }

    try {
      const films = await this.getFilms();
      const resultado = films.filter(f => parseInt(f.release_date, 10) === anio);

      if (resultado.length === 0) {
        _mostrar(`No se encontraron películas del año ${anio}.`, "warn");
        console.warn(`Sin resultados para el año ${anio}`);
        return;
      }

      console.table(resultado.map(f => ({ Título: f.title, Director: f.director, Año: f.release_date })));

      const filas = resultado.map(f => `
        <tr>
          <td>${f.title}</td>
          <td>${f.director}</td>
          <td>${f.release_date}</td>
        </tr>
      `).join("");

      _mostrar(`
        <h2>3. Películas del año ${anio}</h2>
        <table>
          <thead><tr><th>Título</th><th>Director</th><th>Año</th></tr></thead>
          <tbody>${filas}</tbody>
        </table>
      `);
    } catch (e) {
      _mostrar(e.message, "error");
      console.error(e);
    }
  }

  // ── 4. Títulos y Descripción ───────────────────────────────

  async listarTitulosYDescripcion() {
    try {
      const films = await this.getFilms();

      console.table(films.map(f => ({ Título: f.title, Descripción: f.description })));

      const filas = films.map(f => `
        <tr>
          <td><strong>${f.title}</strong></td>
          <td>${f.description}</td>
        </tr>
      `).join("");

      _mostrar(`
        <h2>4. Títulos y Descripción</h2>
        <table>
          <thead><tr><th style="width:180px">Título</th><th>Descripción</th></tr></thead>
          <tbody>${filas}</tbody>
        </table>
      `);
    } catch (e) {
      _mostrar(e.message, "error");
      console.error(e);
    }
  }

  // ── 5. Listar IDs ──────────────────────────────────────────

  async listarIds() {
    try {
      const films = await this.getFilms();

      console.table(films.map(f => ({ ID: f.id, Título: f.title })));

      const filas = films.map(f => `
        <tr>
          <td><code>${f.id}</code></td>
          <td>${f.title}</td>
        </tr>
      `).join("");

      _mostrar(`
        <h2>5. IDs de las películas</h2>
        <table>
          <thead><tr><th>ID</th><th>Título</th></tr></thead>
          <tbody>${filas}</tbody>
        </table>
      `);
    } catch (e) {
      _mostrar(e.message, "error");
      console.error(e);
    }
  }
}

// ── Helpers de UI ──────────────────────────────────────────

/**
 * Muestra contenido HTML en el div resultado.
 * @param {string} html
 * @param {"ok"|"error"|"warn"} [tipo="ok"]
 */
function _mostrar(html, tipo = "ok") {
  const div = document.getElementById("resultado");
  div.innerHTML = html;
  div.className = tipo === "ok" ? "" : tipo;
  div.style.display = "block";
}

/** Agrega un badge de caché junto al título de la sección activa. */
function _badge(texto) {
  setTimeout(() => {
    const h2 = document.querySelector("#resultado h2");
    if (!h2) return;
    const span = document.createElement("span");
    span.className = "badge-cache";
    span.textContent = texto;
    h2.appendChild(span);
  }, 0);
}

// ── Instancia global ────────────────────────────────────────
const api = new GhibliAPI();
