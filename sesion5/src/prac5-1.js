// Importa la librería Dash.js desde el archivo separado
const script = document.createElement('script');
script.src = 'C:/Users/uo266801/Documents/cgsm-pl3-uo266801/dash.all.min.js';
script.onload = function() {
    // Una vez que la librería Dash.js se haya cargado correctamente, puedes utilizarla
    document.addEventListener("DOMContentLoaded", function() {
        // URL del manifiesto DASH
        const url = "http://localhost:60080/sintel480fix.mpd";

        // Crea un reproductor Dash.js
        const player = dashjs.MediaPlayer().create();

        // Inicializa el reproductor con el manifiesto DASH
        player.initialize(document.querySelector("#player"), url, true);
    });
};
document.head.appendChild(script);
