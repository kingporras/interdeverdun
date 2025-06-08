import { plantilla } from "./jugadores-data.js";

function cargarEstadisticas() {
  return JSON.parse(localStorage.getItem("statsJugadores") || "{}");
}

function guardarEstadisticas(stats) {
  localStorage.setItem("statsJugadores", JSON.stringify(stats));
}

function crearToast(mensaje) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = mensaje;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function renderPerfiles() {
  const stats = cargarEstadisticas();
  const contenedor = document.createElement("section");
  contenedor.id = "perfiles";
  contenedor.innerHTML = "<h2>Perfiles de Jugadores</h2>";

  plantilla.forEach(jugador => {
    const jugadorStats = stats[jugador.id] || { goles: 0, asistencias: 0, partidos: 0 };
    const div = document.createElement("div");
    div.className = "perfil";

    div.innerHTML = `
      <img src="assets/jugadores/${jugador.id}.jpg" alt="${jugador.nombre}" />
      <h3>${jugador.nombre} (#${jugador.dorsal})</h3>
      <p>Apodo: ${jugador.apodo}</p>
      <div class="stats-view">
        <p>Partidos: <span>${jugadorStats.partidos}</span></p>
        <p>Goles: <span>${jugadorStats.goles}</span></p>
        <p>Asistencias: <span>${jugadorStats.asistencias}</span></p>
      </div>
      <div class="stats-edit hidden">
        <label><input type="number" data-field="partidos" value="${jugadorStats.partidos}" /></label>
        <label><input type="number" data-field="goles" value="${jugadorStats.goles}" /></label>
        <label><input type="number" data-field="asistencias" value="${jugadorStats.asistencias}" /></label>
      </div>
      <button class="editarBtn">Editar</button>
      <button class="guardarBtn hidden">Guardar</button>
    `;

    const editarBtn = div.querySelector(".editarBtn");
    const guardarBtn = div.querySelector(".guardarBtn");
    const view = div.querySelector(".stats-view");
    const edit = div.querySelector(".stats-edit");

    editarBtn.onclick = () => {
      view.classList.add("hidden");
      edit.classList.remove("hidden");
      editarBtn.classList.add("hidden");
      guardarBtn.classList.remove("hidden");
    };

    guardarBtn.onclick = () => {
      const nuevos = {
        partidos: parseInt(edit.querySelector('[data-field="partidos"]').value),
        goles: parseInt(edit.querySelector('[data-field="goles"]').value),
        asistencias: parseInt(edit.querySelector('[data-field="asistencias"]').value)
      };
      stats[jugador.id] = nuevos;
      guardarEstadisticas(stats);
      crearToast("Estadísticas guardadas");

      view.querySelectorAll("span")[0].textContent = nuevos.partidos;
      view.querySelectorAll("span")[1].textContent = nuevos.goles;
      view.querySelectorAll("span")[2].textContent = nuevos.asistencias;

      view.classList.remove("hidden");
      edit.classList.add("hidden");
      editarBtn.classList.remove("hidden");
      guardarBtn.classList.add("hidden");
    };

    contenedor.appendChild(div);
  });

  document.body.appendChild(contenedor);
}

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("autorizado") === "true") {
    renderPerfiles();
  }
});
