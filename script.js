
document.addEventListener("DOMContentLoaded", () => {
    fetch("convocatoria.json")
        .then(response => response.json())
        .then(data => {
            const bloque = document.querySelector(".convocatoria-bloque");
            let titularesHTML = "<h3>TITULARES</h3><ul>";
            data.titulares.forEach(jugador => {
                titularesHTML += `<li><strong>${jugador.dorsal} ${jugador.nombre}</strong>` +
                                 (jugador.alias ? ` (${jugador.alias})` : "") + `</li>`;
            });
            titularesHTML += "</ul>";

            let suplentesHTML = "<h3>SUPLENTES</h3><ul>";
            data.suplentes.forEach(suplente => {
                suplentesHTML += `<li><strong>${suplente}</strong></li>`;
            });
            suplentesHTML += "</ul>";

            let extraHTML = `<p><strong>DT:</strong> ${data.dt}</p>
                             <p><strong>PRESIDENTE:</strong> ${data.presidente}</p>
                             <div class="lema">${data.lema}</div>`;

            bloque.innerHTML = titularesHTML + suplentesHTML + extraHTML;
        });
});
