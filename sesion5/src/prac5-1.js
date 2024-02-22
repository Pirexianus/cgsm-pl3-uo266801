import dash.all.min.js;

const url = "url_al_manifiesto";
const player = dashjs.MediaPlayer().create();
player.initialize(document.querySelector("#player"), url, true);