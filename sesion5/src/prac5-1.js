const url ="https://dash.akamaized.net/dash264/TestCases/1a/sony/SNE_DASH_SD_CASE1A_REVISED.mpd";  
var player = dashjs.MediaPlayer().create();
player.initialize(document.querySelector("#player"), url, true);