// ============================================================
// Pokédex — consumo de PokéAPI con fetch, caché y clases
// Patrones: async/await, Map cache, .map() .filter() .reduce()
// ============================================================

/**
 * @typedef {{ name: string, url: string }} PokemonRef
 *
 * @typedef {{
 *   id: number,
 *   name: string,
 *   sprites: { front_default: string, other: { 'official-artwork': { front_default: string } } },
 *   types: Array<{ type: { name: string } }>,
 *   stats: Array<{ base_stat: number, stat: { name: string } }>,
 *   height: number,
 *   weight: number
 * }} Pokemon
 */

/** Colores por tipo de Pokémon */
const TIPO_COLOR = {
  fire: "#F08030",     water: "#6890F0",  grass: "#78C850",
  electric: "#F8D030", psychic: "#F85888", ice: "#98D8D8",
  dragon: "#7038F8",   dark: "#705848",   fairy: "#EE99AC",
  normal: "#A8A878",   fighting: "#C03028", flying: "#A890F0",
  poison: "#A040A0",   ground: "#E0C068", rock: "#B8A038",
  bug: "#A8B820",      ghost: "#705898",  steel: "#B8B8D0",
};

const STAT_MAX = { hp: 255, attack: 190, defense: 230, "special-attack": 194,
                   "special-defense": 230, speed: 200 };

class Pokedex {
  constructor() {
    /** @type {Map<string, Pokemon>} */
    this._cache = new Map();

    /** @type {PokemonRef[]} */
    this._listaCompleta = [];

    /** @type {PokemonRef[]} */
    this._vistaActual = [];

    this._offset = 0;
    this._limit = 20;
    this._modoFiltro = false;
  }

  // ── Inicialización ─────────────────────────────────────────

  async init() {
    this._mostrarEstado("Cargando lista de Pokémon...", "cargando");
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      this._listaCompleta = data.results;
      this._poblarFiltroTipos();
      await this._mostrarPagina(this._listaCompleta.slice(0, this._limit));
      this._actualizarPie();
    } catch (e) {
      this._mostrarEstado(`Error al conectar con la API: ${e.message}`, "error");
      console.error(e);
    }
  }

  // ── Carga de datos ─────────────────────────────────────────

  /**
   * Obtiene un Pokémon por nombre o ID.
   * Usa caché para no repetir llamadas a la API.
   * @param {string} nombreOId
   * @returns {Promise<Pokemon>}
   */
  async _fetchPokemon(nombreOId) {
    const key = String(nombreOId).toLowerCase();
    if (this._cache.has(key)) return this._cache.get(key);

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${key}`);
    if (!res.ok) throw new Error(`Pokémon "${key}" no encontrado (HTTP ${res.status})`);
    const pokemon = await res.json();
    this._cache.set(key, pokemon);
    this._cache.set(String(pokemon.id), pokemon); // indexar también por ID
    return pokemon;
  }

  /**
   * Carga en paralelo un batch de referencias y retorna los Pokémon.
   * @param {PokemonRef[]} refs
   * @returns {Promise<Pokemon[]>}
   */
  async _fetchBatch(refs) {
    const promesas = refs.map(r => this._fetchPokemon(r.name));
    return Promise.all(promesas);
  }

  // ── Renderizado ────────────────────────────────────────────

  /**
   * Muestra un conjunto de PokemonRef en el grid.
   * @param {PokemonRef[]} refs
   * @param {boolean} [limpiar=true]
   */
  async _mostrarPagina(refs, limpiar = true) {
    this._ocultarEstado();
    const grid = document.getElementById("grid");
    if (limpiar) grid.innerHTML = "";

    const pokemons = await this._fetchBatch(refs);
    const usaCache = this._cache.size > refs.length;

    if (usaCache) this._mostrarEstado("Datos cargados desde caché local.", "cache");

    const fragment = document.createDocumentFragment();
    pokemons.forEach(p => {
      const card = this._crearCard(p);
      fragment.appendChild(card);
    });
    grid.appendChild(fragment);

    console.log(`Renderizados: ${pokemons.map(p => p.name).join(", ")}`);
  }

  /**
   * Crea el elemento DOM de una tarjeta.
   * @param {Pokemon} p
   * @returns {HTMLElement}
   */
  _crearCard(p) {
    const tipos = p.types.map(t => t.type.name);
    const sprite = p.sprites.other["official-artwork"].front_default || p.sprites.front_default;
    const badgesTipo = tipos.map(t =>
      `<span class="tipo" style="background:${TIPO_COLOR[t] || "#999"}">${t}</span>`
    ).join("");

    const card = document.createElement("div");
    card.className = "card";
    card.dataset.nombre = p.name;
    card.innerHTML = `
      <img src="${sprite}" alt="${p.name}" loading="lazy">
      <div class="nombre">${p.name}</div>
      <div class="id">#${String(p.id).padStart(3, "0")}</div>
      <div class="tipos">${badgesTipo}</div>
    `;
    card.addEventListener("click", () => this.verDetalle(p.name));
    return card;
  }

  /**
   * Muestra el panel de detalle de un Pokémon.
   * @param {string} nombre
   */
  async verDetalle(nombre) {
    const overlay = document.getElementById("overlay");
    const contenido = document.getElementById("contenido-detalle");
    contenido.innerHTML = "<p>Cargando...</p>";
    overlay.classList.add("visible");

    try {
      const p = await this._fetchPokemon(nombre);
      const tipos = p.types.map(t => t.type.name);
      const sprite = p.sprites.other["official-artwork"].front_default || p.sprites.front_default;
      const badgesTipo = tipos.map(t =>
        `<span class="tipo" style="background:${TIPO_COLOR[t] || "#999"}">${t}</span>`
      ).join(" ");

      const statsHtml = p.stats.map(s => {
        const max = STAT_MAX[s.stat.name] || 255;
        const pct = Math.round((s.base_stat / max) * 100);
        const color = pct > 60 ? "#4caf50" : pct > 35 ? "#f0a500" : "#e53935";
        return `
          <div class="stat-fila">
            <span class="stat-nombre">${s.stat.name}</span>
            <span class="stat-valor">${s.base_stat}</span>
            <div class="stat-barra-bg">
              <div class="stat-barra" style="width:${pct}%; background:${color}"></div>
            </div>
          </div>
        `;
      }).join("");

      contenido.innerHTML = `
        <div class="detalle-header">
          <img src="${sprite}" alt="${p.name}">
          <div>
            <h2>${p.name}</h2>
            <div class="id">#${String(p.id).padStart(3, "0")}</div>
            <div class="tipos" style="margin-top:8px">${badgesTipo}</div>
            <p style="font-size:13px; margin:8px 0 0; color:#555">
              Altura: ${p.height / 10} m &nbsp;|&nbsp; Peso: ${p.weight / 10} kg
            </p>
          </div>
        </div>
        <div class="stats">
          <h3>Estadísticas base</h3>
          ${statsHtml}
        </div>
      `;
      console.log(`Detalle de ${p.name}:`, { tipos, stats: p.stats });
    } catch (e) {
      contenido.innerHTML = `<p style="color:red">${e.message}</p>`;
    }
  }

  cerrarDetalle(event) {
    if (event && event.target !== document.getElementById("overlay")) return;
    document.getElementById("overlay").classList.remove("visible");
  }

  // ── Acciones del usuario ───────────────────────────────────

  async buscar() {
    const query = document.getElementById("buscador").value.trim().toLowerCase();
    if (!query) return;

    this._modoFiltro = true;
    this._mostrarEstado(`Buscando "${query}"...`, "cargando");
    document.getElementById("grid").innerHTML = "";
    document.getElementById("pie").style.display = "none";

    try {
      const p = await this._fetchPokemon(query);
      await this._mostrarPagina([{ name: p.name, url: "" }]);
      this._ocultarEstado();
    } catch (e) {
      this._mostrarEstado(`No se encontró el Pokémon "${query}".`, "error");
    }
  }

  async filtrarPorTipo() {
    const tipo = document.getElementById("filtro-tipo").value;
    if (!tipo) { this.reiniciar(); return; }

    this._modoFiltro = true;
    this._mostrarEstado(`Filtrando por tipo "${tipo}"...`, "cargando");
    document.getElementById("grid").innerHTML = "";
    document.getElementById("pie").style.display = "none";

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      // solo los de la lista base (Gen 1)
      const refs = data.pokemon
        .map(p => p.pokemon)
        .filter(p => this._listaCompleta.some(b => b.name === p.name));

      this._vistaActual = refs;
      await this._mostrarPagina(refs.slice(0, this._limit));
      this._ocultarEstado();
      console.log(`Tipo "${tipo}": ${refs.length} Pokémon encontrados`);
    } catch (e) {
      this._mostrarEstado(`Error al filtrar: ${e.message}`, "error");
    }
  }

  async cargarMas() {
    if (this._modoFiltro) return;
    this._offset += this._limit;
    const siguiente = this._listaCompleta.slice(this._offset, this._offset + this._limit);
    if (siguiente.length === 0) return;
    await this._mostrarPagina(siguiente, false);
    this._actualizarPie();
  }

  async reiniciar() {
    this._modoFiltro = false;
    this._offset = 0;
    document.getElementById("buscador").value = "";
    document.getElementById("filtro-tipo").value = "";
    await this._mostrarPagina(this._listaCompleta.slice(0, this._limit));
    this._actualizarPie();
  }

  // ── Helpers de UI ──────────────────────────────────────────

  _mostrarEstado(msg, tipo) {
    const el = document.getElementById("estado");
    el.textContent = msg;
    el.className = `estado ${tipo}`;
    el.style.display = "block";
  }

  _ocultarEstado() {
    const el = document.getElementById("estado");
    el.style.display = "none";
  }

  _actualizarPie() {
    const pie = document.getElementById("pie");
    const info = document.getElementById("info-total");
    const mostrados = Math.min(this._offset + this._limit, this._listaCompleta.length);
    info.textContent = `Mostrando ${mostrados} de ${this._listaCompleta.length} Pokémon`;
    pie.style.display = this._modoFiltro ? "none" : "flex";
  }

  async _poblarFiltroTipos() {
    const tipos = Object.keys(TIPO_COLOR);
    const select = document.getElementById("filtro-tipo");
    tipos.sort().forEach(t => {
      const opt = document.createElement("option");
      opt.value = t;
      opt.textContent = t.charAt(0).toUpperCase() + t.slice(1);
      select.appendChild(opt);
    });
  }
}

// ── Instancia global ────────────────────────────────────────
const pokedex = new Pokedex();
pokedex.init();
