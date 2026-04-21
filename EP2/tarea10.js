const app = (() => {
  const API_URL = "https://rickandmortyapi.com/api/character/1,2,3,4,5,6,7,8,9,10";
  let cache = null;

  const resultado = () => document.getElementById("resultado");

  async function obtenerPersonajes() {
    if (cache) {
      mostrarBadgeCache();
      return cache;
    }
    const res = await fetch(API_URL);
    const data = await res.json();
    cache = data;
    return cache;
  }

  function mostrarBadgeCache() {
    const badge = document.createElement("span");
    badge.className = "badge-cache";
    badge.textContent = "desde caché local";
    resultado().innerHTML = "";
    resultado().appendChild(badge);
  }

  async function listarPersonajes() {
    const data = await obtenerPersonajes();
    const personajes = data;

    const lista = personajes.map(p => `
      <li>
        <strong>ID:</strong> ${p.id}<br>
        <strong>Nombre:</strong> ${p.name}<br>
        <strong>Especie:</strong> ${p.species}<br>
        <img src="${p.image}" alt="${p.name}" style="width:60px; border-radius:4px; margin-top:6px;">
      </li>
    `).join("");

    resultado().innerHTML = `<h2>1. Lista de personajes (primeros 10)</h2><ul class="lista-personajes">${lista}</ul>`;
    console.log("Lista de personajes:", personajes.map(p => `ID: ${p.id} - ${p.name} - ${p.species}`));
  }

  async function agruparPorEspecie() {
    const data = await obtenerPersonajes();

    const grupos = data.reduce((acc, p) => {
      if (!acc[p.species]) acc[p.species] = [];
      acc[p.species].push(p);
      return acc;
    }, {});

    const especiesOrdenadas = Object.keys(grupos).sort();

    const html = especiesOrdenadas.map(especie => {
      const items = grupos[especie].map(p => `<li>${p.name} (ID: ${p.id})</li>`).join("");
      return `
        <div class="especie-grupo">
          <h3>${especie}</h3>
          <ul>${items}</ul>
        </div>
      `;
    }).join("");

    resultado().innerHTML = `<h2>2. Agrupación por especie</h2>${html}`;
    console.log("Agrupación por especie:", grupos);
  }

  async function fichaPersonaje(id) {
    const data = await obtenerPersonajes();
    const p = data.find(p => p.id === id);

    if (!p) {
      resultado().innerHTML = `<p>Personaje con ID ${id} no encontrado.</p>`;
      return;
    }

    resultado().innerHTML = `
      <h2>3. Ficha de personaje</h2>
      <div class="ficha">
        <img src="${p.image}" alt="${p.name}">
        <div class="ficha-info">
          <p><strong>ID:</strong> ${p.id}</p>
          <p><strong>Nombre:</strong> ${p.name}</p>
          <p><strong>Especie:</strong> ${p.species}</p>
          <p><strong>Estado:</strong> ${p.status}</p>
          <p><strong>Género:</strong> ${p.gender}</p>
        </div>
      </div>
    `;
    console.log("Ficha de personaje:", p);
  }

  return { listarPersonajes, agruparPorEspecie, fichaPersonaje };
})();
