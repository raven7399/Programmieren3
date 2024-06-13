// Socket.io: Verbindung zum Server herstellen

// const { grassArray, rasenDestroyerArray, fleischfresserArray, wasserArray, mannArray, frauArray } = require("../Projekt2/hilfsfunktionen");

// const { rasenDestroyerArray, fleischfresserArray, wasserArray, mannArray, frauArray } = require("../Projekt2/hilfsfunktionen");

// const { matrix, anzahl } = require("../Projekt2/hilfsfunktionen");

// Die socket Variable enthält eine Verbindung zum Server.
const socket = io();
const cellSize = 5;

const data = {
    labels: ['Sand', 'Grass', 'RasenDestroyer', 'Fleischfresser', 'Wasser', 'Mann', 'Frau'],
    datasets: [{
        data: [10, 20, 30, 40, 50, 60, 70],
        backgroundColor: ['#ffdc64', '#44BD2F', '#FF0000', '#000000', '#0000FF', '#ADD8E6', '#FFC0CB']
    }]
};

// Config
const config = {
    type: 'pie',
    data: data
};

let pieChart;

// setup Funktion von p5.js
function setup() {
    createCanvas(550, windowHeight);
    noStroke();
    pieChart = new Chart(document.getElementById('myPieChart'), config);
}

// Mit socket.on() können wir auf Ereignisse vom Server reagieren.
// Hier reagieren wir auf das Ereignis matrix, das uns die aktuelle Matrix vom Server sendet.
socket.on('data', (data) => {
    matrix = data.matrix
    anzahl = data.anzahl
    grassArray = data.grassArray
    rasenDestroyerArray = data.rasenDestroyerArray
    fleischfresserArray = data.fleischfresserArray
    wasserArray = data.wasserArray
    mannArray = data.mannArray
    frauArray = data.frauArray
    let sand = Math.pow(matrix.length,2) - grassArray.length - rasenDestroyerArray.length - fleischfresserArray.length - wasserArray.length - mannArray.length - frauArray.length;
    let arr = [sand,grassArray.length,rasenDestroyerArray.length,fleischfresserArray.length,wasserArray.length,mannArray.length,frauArray.length];
    // console.log(arr)
    pieChart.data.datasets[0].data = arr
    pieChart.update();
    document.getElementById("statistik").innerHTML = "Anzahl von Gras (insgesamt): " + anzahl.grass 
    document.getElementById("statistik2").innerHTML = "Anzahl von RasenDestroyern (insgesamt): " + anzahl.rd 
    document.getElementById("statistik3").innerHTML = "Anzahl von Fleischfressern (insgesamt): " + anzahl.ff 
    document.getElementById("statistik4").innerHTML = "Anzahl von Wasser (insgesamt): " + anzahl.wasser 
    document.getElementById("statistik5").innerHTML = "Anzahl von Männern (insgesamt): " + anzahl.m 
    document.getElementById("statistik6").innerHTML = "Anzahl von Frauen (insgesamt): " + anzahl.f
    // Die Matrix wird auf den Bildschirm gezeichnet.
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            fill(matrix[i][j]);
            rect(j * cellSize, i * cellSize, cellSize, cellSize);
        }
    }
});

// wir können hier auch auf andere Ereignisse reagieren, die der Server sendet
// socket.on('someEvent', (data) => {