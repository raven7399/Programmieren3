// import von der setup und draw Funktion und der matrix Variable
// ...

const { setup, draw } = require("./Projekt2/script");
const { matrix, anzahl, grassArray, rasenDestroyerArray, fleischfresserArray, wasserArray, mannArray, frauArray } = require("./Projekt2/hilfsfunktionen");

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// wir speichern das Ergebnis von der setInterval Funktion in einer Variable,
// damit wir es später stoppen können
let intetval;

// wir sagen Express, dass die Dateien im Ordner client statisch sind
// das bedeutet, dass sie direkt an der Browser geschickt werden können
// Der Code für den Client muss also im Ordner client liegen
app.use(express.static('client'));

// wenn ein Benutzer die Seite öffnet, wird er auf die index.html Datei weitergeleitet
app.get('/', (req, res) => {
    res.redirect('/index2.html');
});

// wir starten den Server auf dem Port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
setup();
// wenn ein Benutzer eine Verbindung zum Server herstellt, wird diese Funktion ausgeführt
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');

        // wir stoppen das Spiel, wenn der Benutzer die Verbindung trennt
        clearInterval(intetval);
    });

    
    intetval = setInterval(() => {
        draw();
        data = {
            matrix: transformMatrix(matrix),
            anzahl: anzahl,
            grassArray: grassArray,
            rasenDestroyerArray: rasenDestroyerArray,
            fleischfresserArray: fleischfresserArray,
            wasserArray: wasserArray,
            mannArray: mannArray,
            frauArray: frauArray
        }
        socket.emit('data', data);
    }, 30);
});


// Diese Funktion sorgt dafür, dass die Matrix nur noch Strings mit Farben enthält
function transformMatrix(matrix) {
    // Wenn ihr Zahlen in der Matrix habt, können sie hier in Farben umgewandelt werden
    // ...


    let farbTabelle = [
        "rgb(255,220,100)",
        "rgb(68, 189, 47)",
        "rgb(255, 0, 0)",
        "rgb(0,0,0)",
        "rgb(0,0,255)",
        "rgb(173,216,230)",
        "rgb(255,192,203)",
    ]


    let newMatrix = []


    for (let i = 0; i < matrix.length; i++) {
        let zeile = []
        for (let j = 0; j < matrix[i].length; j++) {

            let nummer = matrix[i][j];
            let farbe = farbTabelle[nummer];

            zeile.push(farbe);

        }
        newMatrix.push(zeile);
    }
    return newMatrix
}