import { plantilla } from "./jugadores-data.js";

function cargarConvocados() {
  return JSON.parse(localStorage.getItem("convocadosB") || "[]");
}

function guardarConvocados(lista) {
  localStorage.setItem("convocadosB", JSON.stringify(lista));
}

function renderConvocatoria() {
  const convocados = cargarConvocados();
  const section = document.createElement("section");
  section.id = "convocatoria";
  section.innerHTML = `<h2>Convocatoria Oficial</h2><ul id="lista-convocados"></ul>`;

  const lista = section.querySelector("#lista-convocados");

  plantilla.forEach(jugador => {
    const li = document.createElement("li");
    li.innerHTML = `
      <label>
        <input type="checkbox" data-id="${jugador.id}" ${convocados.includes(jugador.id) ? "checked" : ""}>
        ${jugador.nombre} (#${jugador.dorsal})
      </label>
    `;
    lista.appendChild(li);
  });

  // Botón guardar (solo aparece con PIN correcto)
  if (localStorage.getItem("autorizado") === "true") {
    const btnGuardar = document.createElement("button");
    btnGuardar.textContent = "Guardar convocatoria";
    btnGuardar.onclick = () => {
      const seleccionados = Array.from(lista.querySelectorAll("input:checked")).map(el => el.dataset.id);
      guardarConvocados(seleccionados);
      alert("Convocatoria guardada correctamente.");
    };
    section.appendChild(btnGuardar);
  }

  document.body.appendChild(section);
}

window.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector("#convocatoria") === null) {
    renderConvocatoria();
  }
});
