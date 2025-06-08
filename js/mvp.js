import { plantilla } from "./jugadores-data.js";

const MVP_KEY = "votosMVP";
const ULTIMA_VOTACION_KEY = "ultimaVotacion";

// Reinicio automático cada jueves a las 00:00
function reiniciarSiToca() {
  const hoy = new Date();
  const ultimo = new Date(localStorage.getItem(ULTIMA_VOTACION_KEY) || 0);

  const proximoJueves = new Date(hoy);
  proximoJueves.setDate(hoy.getDate() + ((4 - hoy.getDay() + 7) % 7)); // jueves
  proximoJueves.setHours(0, 0, 0, 0);

  if (hoy > proximoJueves && ultimo < proximoJueves) {
    localStorage.removeItem(MVP_KEY);
    localStorage.setItem(ULTIMA_VOTACION_KEY, hoy.toISOString());
  }
}

function guardarVoto(idJugador) {
  const votos = JSON.parse(localStorage.getItem(MVP_KEY) || "{}");
  const yaVotado = localStorage.getItem("votoRealizado");

  if (yaVotado) {
    alert("Ya has votado. Gracias por participar.");
    return;
  }

  votos[idJugador] = (votos[idJugador] || 0) + 1;
  localStorage.setItem(MVP_KEY, JSON.stringify(votos));
  localStorage.setItem("votoRealizado", "1");
  renderMVP();
}

function renderMVP() {
  reiniciarSiToca();

  const votos = JSON.parse(localStorage.getItem(MVP_KEY) || "{}");

  const section = document.getElementById("mvp");
  section.innerHTML = `
    <h2>🏆 Vota al MVP del partido</h2>
    <ul id="lista-mvp"></ul>
  `;

  const ul = section.querySelector("#lista-mvp");

  plantilla.forEach(jugador => {
    const li = document.createElement("li");
    const cantidad = votos[jugador.id] || 0;

    li.innerHTML = `
      <button onclick="guardarVoto('${jugador.id}')">✅ Votar</button>
      <strong>${jugador.nombre}</strong> – <span>${cantidad} votos</span>
    `;
    ul.appendChild(li);
  });
}

window.guardarVoto = guardarVoto;
window.addEventListener("DOMContentLoaded", renderMVP);
