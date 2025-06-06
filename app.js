
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

function promptInstalacion() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(() => {
            deferredPrompt = null;
        });
    }
}

function guardarConvocatoria() {
    const texto = document.getElementById('convocatoriaText').value;
    localStorage.setItem('convocatoriaVerdun', texto);
    mostrarConvocatoria();
}

function mostrarConvocatoria() {
    const texto = localStorage.getItem('convocatoriaVerdun') || "Sin convocatoria guardada.";
    document.getElementById('convocatoriaPreview').innerText = texto;
}

document.addEventListener('DOMContentLoaded', mostrarConvocatoria);
