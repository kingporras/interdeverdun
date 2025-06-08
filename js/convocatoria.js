import { plantilla } from "./jugadores-data.js";

function cargarConvocatoria() {
  return JSON.parse(localStorage.getItem("convocatoriaB") || "[]");
}

function guardarConvocatoria(jugadores, titulo) {
  const data = { jugadores, titulo };
  localStorage.setItem("convocatoriaB", JSON.stringify(data));
}

function renderConvocatoria() {
  const saved = JSON.parse(localStorage.getItem("convocatoriaB") || "{}");
  const convocados = saved.jugadores || [];
  const tituloConvocatoria = saved.titulo || "Convocatoria pendiente";

  const section = document.createElement("section");
  section.id = "convocatoria";
  section.innerHTML = `
    <h2>${tituloConvocatoria}</h2>
    <ul id="lista-convocados"></ul>
  `;

  const lista = section.querySelector("#lista-convocados");

  plantilla.forEach(jugador => {
    if (convocados.includes(jugador.id)) {
      const li = document.createElement("li");
      li.textContent = `✅ ${jugador.nombre}`;
      lista.appendChild(li);
    }
  });

  // Editor solo para el míster
  if (localStorage.getItem("autorizado") === "true") {
    section.innerHTML += `
      <hr>
      <label>Título de convocatoria: <input type="text" id="tituloConvocatoria" value="${tituloConvocatoria}" /></label>
      <ul id="editar-convocados"></ul>
      <button id="guardarConvocatoria">Guardar convocatoria</button>
    `;

    const editor = section.querySelector("#editar-convocados");
    plantilla.forEach(jugador => {
      const li = document.createElement("li");
      li.innerHTML = `
        <label>
          <input type="checkbox" data-id="${jugador.id}" ${convocados.includes(jugador.id) ? "checked" : ""}>
          ${jugador.nombre} (#${jugador.dorsal})
        </label>
      `;
      editor.appendChild(li);
    });

    section.querySelector("#guardarConvocatoria").onclick = () => {
      const seleccionados = Array.from(editor.querySelectorAll("input:checked")).map(el => el.dataset.id);
      const nuevoTitulo = document.getElementById("tituloConvocatoria").value.trim() || "Convocatoria";
      guardarConvocatoria(seleccionados, nuevoTitulo);
      alert("Convocatoria guardada.");
      location.reload();
    };
  }

  document.body.appendChild(section);
}

window.addEventListener("DOMContentLoaded", renderConvocatoria);
